Feature: RGAA Reference

#  Scenario: key.then.a11y.rgaa.default
#    When I visit path "https://accessibilite.numerique.gouv.fr/ressources/questions/"
#    Then I should not have any rgaa accessibility issue

  Scenario: key.then.a11y.rgaa.defaultWithResultContaining
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/a11y-test.html"
    Then I should have the following partial result based on the rgaa reference
    """json
      {
        "status": "error",
        "criteria": {
          "1.5": {
            "status": "manual"
          },
          "1.6": {
            "status": "manual",
            "tests": {
              "1.6.5": {
                "status": "success"
              }
            }
          },
          "11.1": {
            "status": "success",
            "tests": {
              "11.1.1": {
                "status": "success"
              }
            }
          }
        }
      }
    """

  Scenario: key.then.a11y.rgaa.defaultWithResult
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/a11y-test.html"
    Then I should have the following result based on the rgaa reference
    """json
      {
  "status": "error",
  "criteria": {
    "1.1": {
        "status": "error",
        "tests": {
            "1.1.1": {
                "status": "error"
            },
            "1.1.2": {
                "status": "error"
            },
            "1.1.3": {
                "status": "error"
            },
            "1.1.4": {
                "status": "success"
            },
            "1.1.5": {
                "status": "error"
            },
            "1.1.6": {
                "status": "error"
            }
        }
    },
    "1.2": {
        "status": "success",
        "tests": {
            "1.2.1": {
                "status": "success"
            },
            "1.2.2": {
                "status": "success"
            },
            "1.2.3": {
                "status": "success"
            },
            "1.2.4": {
                "status": "success"
            },
            "1.2.5": {
                "status": "success"
            },
            "1.2.6": {
                "status": "success"
            }
        }
    },
    "2.1": {
        "status": "error",
        "tests": {
            "2.1.1": {
                "status": "error"
            }
        }
    },
    "5.1": {
        "status": "success",
        "tests": {
            "5.1.1": {
                "status": "success"
            }
        }
    },
    "5.2": {
        "status": "success",
        "tests": {
            "5.2.1": {
                "status": "success"
            }
        }
    },
    "5.3": {
        "status": "success",
        "tests": {
            "5.3.1": {
                "status": "success"
            }
        }
    },
    "5.4": {
        "status": "success",
        "tests": {
            "5.4.1": {
                "status": "success"
            }
        }
    },
    "5.5": {
        "status": "success",
        "tests": {
            "5.5.1": {
                "status": "success"
            }
        }
    },
    "5.6": {
        "status": "success",
        "tests": {
            "5.6.1": {
                "status": "success"
            },
            "5.6.2": {
                "status": "success"
            },
            "5.6.3": {
                "status": "success"
            },
            "5.6.4": {
                "status": "success"
            }
        }
    },
    "5.7": {
        "status": "success",
        "tests": {
            "5.7.1": {
                "status": "success"
            },
            "5.7.2": {
                "status": "success"
            },
            "5.7.3": {
                "status": "success"
            },
            "5.7.4": {
                "status": "success"
            },
            "5.7.5": {
                "status": "success"
            }
        }
    },
    "5.8": {
        "status": "success",
        "tests": {
            "5.8.1": {
                "status": "success"
            }
        }
    },
    "6.1": {
        "status": "success",
        "tests": {
            "6.1.1": {
                "status": "success"
            },
            "6.1.2": {
                "status": "success"
            },
            "6.1.3": {
                "status": "success"
            },
            "6.1.4": {
                "status": "success"
            },
            "6.1.5": {
                "status": "success"
            }
        }
    },
    "6.2": {
        "status": "success",
        "tests": {
            "6.2.1": {
                "status": "success"
            }
        }
    },
    "8.1": {
        "status": "error",
        "tests": {
            "8.1.1": {
                "status": "error"
            },
            "8.1.2": {
                "status": "error"
            },
            "8.1.3": {
                "status": "error"
            }
        }
    },
    "8.3": {
        "status": "success",
        "tests": {
            "8.3.1": {
                "status": "success"
            }
        }
    },
    "8.4": {
        "status": "manual",
        "tests": {
            "8.4.1": {
                "status": "manual"
            }
        }
    },
    "8.5": {
        "status": "success",
        "tests": {
            "8.5.1": {
                "status": "success"
            }
        }
    },
    "8.6": {
        "status": "manual",
        "tests": {
            "8.6.1": {
                "status": "manual"
            }
        }
    },
    "8.7": {
        "status": "manual",
        "tests": {
            "8.7.1": {
                "status": "manual"
            }
        }
    },
    "8.8": {
        "status": "success",
        "tests": {
            "8.8.1": {
                "status": "success"
            }
        }
    },
    "8.10": {
        "status": "error",
        "tests": {
            "8.10.1": {
                "status": "error"
            },
            "8.10.2": {
                "status": "manual"
            }
        }
    },
    "11.1": {
        "status": "success",
        "tests": {
            "11.1.1": {
                "status": "success"
            }
        }
    },
    "1.3": {
        "status": "manual",
        "tests": {
            "1.3.1": {
                "status": "manual"
            },
            "1.3.2": {
                "status": "manual"
            },
            "1.3.3": {
                "status": "manual"
            },
            "1.3.4": {
                "status": "success"
            },
            "1.3.5": {
                "status": "success"
            },
            "1.3.6": {
                "status": "success"
            },
            "1.3.7": {
                "status": "success"
            },
            "1.3.9": {
                "status": "manual"
            }
        }
    },
    "1.4": {
        "status": "manual",
        "tests": {
            "1.4.1": {
                "status": "manual"
            },
            "1.4.2": {
                "status": "manual"
            },
            "1.4.3": {
                "status": "manual"
            },
            "1.4.4": {
                "status": "success"
            },
            "1.4.5": {
                "status": "success"
            },
            "1.4.6": {
                "status": "success"
            },
            "1.4.7": {
                "status": "success"
            }
        }
    },
    "1.5": {
        "status": "manual",
        "tests": {
            "1.5.1": {
                "status": "manual"
            },
            "1.5.2": {
                "status": "manual"
            }
        }
    },
    "1.6": {
        "status": "manual",
        "tests": {
            "1.6.1": {
                "status": "success"
            },
            "1.6.2": {
                "status": "success"
            },
            "1.6.3": {
                "status": "success"
            },
            "1.6.4": {
                "status": "success"
            },
            "1.6.5": {
                "status": "success"
            },
            "1.6.6": {
                "status": "success"
            },
            "1.6.7": {
                "status": "success"
            },
            "1.6.8": {
                "status": "success"
            },
            "1.6.9": {
                "status": "manual"
            },
            "1.6.10": {
                "status": "manual"
            }
        }
    },
    "2.2": {
        "status": "manual",
        "tests": {
            "2.2.1": {
                "status": "manual"
            }
        }
    },
    "3.1": {
        "status": "manual",
        "tests": {
            "3.1.3": {
                "status": "success"
            },
            "3.1.5": {
                "status": "manual"
            },
            "3.1.6": {
                "status": "manual"
            }
        }
    }
  }
}

    """
