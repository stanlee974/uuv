/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human
* understanding English or French.
*/


import { computeAccessibleName, getRole } from "dom-accessibility-api";
import { EN_ROLES, enSentences, enBasedRoleSentences } from "@uuv/runner-commons/wording/web/en";

export type BaseSentence = {
  key: string;
  description: string;
  wording: string;
}

export type EnrichedSentenceWrapper = {
  enriched: Array<EnrichedSentence>;
}

export type EnrichedSentenceRole = {
  id: string;
  name: string;
}
export type EnrichedSentence = {
  key: string;
  wording: string;
}

export enum CheckActionEnum {
  WITHIN = "Within", EXPECT = "Expect", CLICK = "Click"
}

export enum StepCaseEnum {
  WHEN = "When ", THEN = "Then ", GIVEN = "Given "
}


export class TranslateHelper {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public static getSelector(element: any) {
    const path: string[] = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
      let selector: string = element.nodeName.toLowerCase();
      if (element.id) {
        selector += "#" + element.id;
        path.unshift(selector);
        break;
      } else if (element.getAttribute("data-testid")) {
        selector += `[data-testid=${element.getAttribute("data-testid")}]`;
        path.unshift(selector);
        break;
      } else {
        let sibling = element.previousSibling;
        let index = 1;
        while (sibling) {
          if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName.toLowerCase() === selector) {
            index++;
          }
          sibling = sibling.previousSibling;
        }
        if (index > 1  || element.nextSibling) {
          selector += ":nth-of-type(" + index + ")";
        }
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(" > ");
  }

/* eslint-disable  @typescript-eslint/no-explicit-any */
  public static translateEngine(htmlElem: HTMLElement, checkAction: string, isDisabled: boolean): string[] {
    const jsonBase: BaseSentence[] = enSentences;
    let sentenceList: string[] = [];
    let computedKey = "";
    let stepCase = "";
    if (checkAction === CheckActionEnum.EXPECT) {
      computedKey = "key.then.element.withSelector";
      stepCase = StepCaseEnum.THEN;
    } else if (checkAction === CheckActionEnum.WITHIN || checkAction === CheckActionEnum.CLICK ) {
      computedKey = "key.when.withinElement.selector";
      stepCase = StepCaseEnum.WHEN;
    }
    const sentence = jsonBase
      .filter((el: BaseSentence) => el.key === computedKey)
      .map((el: BaseSentence) =>
        el.wording.replace("{string}", `"${this.getSelector(htmlElem)}"`)
      )[0];
    if (checkAction === CheckActionEnum.CLICK) {
      const clickSentence: BaseSentence = jsonBase.filter((el: BaseSentence) => el.key === "key.when.click.withContext")[0];
      sentenceList = [stepCase + sentence, StepCaseEnum.THEN + clickSentence.wording];
    } else {
      sentenceList = [stepCase + sentence];
    }
    const accessibleRole = getRole(htmlElem);
    const accessibleName = computeAccessibleName(htmlElem);
    const content = htmlElem.getAttribute("value") ?? htmlElem.firstChild?.textContent?.trim();
    if (accessibleRole && accessibleName) {
      const jsonEnriched: EnrichedSentenceWrapper = enBasedRoleSentences;
      if (checkAction === CheckActionEnum.EXPECT) {
        computedKey = "key.then.element.withRoleAndName";
        stepCase = StepCaseEnum.THEN;
      } else if (checkAction === CheckActionEnum.WITHIN  || checkAction === CheckActionEnum.CLICK) {
        computedKey = "key.when.withinElement.roleAndName";
        stepCase = StepCaseEnum.WHEN;
      }
      const sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
        const sentenceAvailable = enriched.wording;
        const role = EN_ROLES.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
        return sentenceAvailable
          .replaceAll("(n)", "")
          .replaceAll("$roleName", role?.name ?? accessibleRole)
          .replaceAll("$definiteArticle", role?.getDefiniteArticle())
          .replaceAll("$indefiniteArticle", role?.getIndefiniteArticle())
          .replaceAll("$namedAdjective", role?.namedAdjective())
          .replaceAll("$ofDefiniteArticle", role?.getOfDefiniteArticle())
          .replace("{string}", `"${accessibleName}"`);
      })[0];
      sentenceList = this.getSentenceList(checkAction, jsonBase, accessibleRole, stepCase, accessibleName, sentence);
      if (content) {
        if (checkAction === CheckActionEnum.EXPECT) {
          if (isDisabled) {
            computedKey = "key.then.element.withRoleAndNameAndContentDisabled";
            stepCase = StepCaseEnum.THEN;
          } else {
            computedKey = "key.then.element.withRoleAndNameAndContent";
            stepCase = StepCaseEnum.THEN;
          }
        } else if (checkAction === CheckActionEnum.WITHIN) {
          computedKey = "key.when.withinElement.roleAndName";
          stepCase = StepCaseEnum.WHEN;
        }
        const sentence = jsonEnriched.enriched.filter((value: EnrichedSentence) => value.key === computedKey).map((enriched: EnrichedSentence) => {
          const sentenceAvailable = enriched.wording;
          const role = EN_ROLES.filter((role: EnrichedSentenceRole) => role.id === accessibleRole)[0];
          return sentenceAvailable
            .replaceAll("(n)", "")
            .replaceAll("$roleName", role?.name ?? accessibleRole)
            .replaceAll("$definiteArticle", role?.getDefiniteArticle())
            .replaceAll("$indefiniteArticle", role?.getIndefiniteArticle())
            .replaceAll("$namedAdjective", role?.namedAdjective())
            .replaceAll("$ofDefiniteArticle", role?.getOfDefiniteArticle())
            .replace("{string}", `"${accessibleName}"`)
            .replace("{string}", `"${content}"`);
        })[0];

        sentenceList = this.getSentenceList(checkAction, jsonBase, accessibleRole, stepCase, accessibleName, sentence);
      }
    }
    return sentenceList;
  }

  private static getSentenceList(
      checkAction: string,
      jsonBase: BaseSentence[],
      accessibleRole: string,
      stepCase: string,
      accessibleName: string,
      sentence: string
  ) {
    if (checkAction === CheckActionEnum.CLICK) {
      if (accessibleRole === "button") {
        const clickSentence: BaseSentence = jsonBase.filter(
            (el: BaseSentence) => (accessibleRole === "button" && el.key === "key.when.click.button")
        )[0];
        return [stepCase + clickSentence.wording.replace("{string}", `"${accessibleName}"`)];
      } else {
        const clickSentence: BaseSentence = jsonBase.filter((el: BaseSentence) => el.key === "key.when.click.withRole")[0];
        return [stepCase + clickSentence.wording.replace("{string}", `"${accessibleRole}"`).replace("{string}", `"${accessibleName}"`)];
      }
    } else {
      return [stepCase + sentence];
    }
  }
}

