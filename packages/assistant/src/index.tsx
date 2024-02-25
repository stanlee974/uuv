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

import React from "react";
import "./index.css";
import UuvAssistant from "./UuvAssistant";
import { createRoot } from "react-dom/client";

/* eslint-disable  @typescript-eslint/no-explicit-any */
document.addEventListener("UUVAssistantReadyToLoad", (e: any) => {
    console.log("event listened: UUVAssistantReadyToLoad");
    const container = document.getElementById("uvv-assistant-root");
    const root = createRoot(container);
    root.render(
        <UuvAssistant translator={e?.detail?.translator}/>
    );
});

