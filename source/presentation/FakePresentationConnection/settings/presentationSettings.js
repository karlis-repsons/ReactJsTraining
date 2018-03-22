/* eslint-disable quotes */
// SI - settings input

const devStyle = false; // use development colors etc. if true, use production style if false

let p = { // dictionary for easy access to the main values
   navigationItemFontSizeRem: 16 / 16,
   verticalScrollAccelerationFactor: 0.2,
   demosNavigationStructureLinesColor: 'hsla(35, 62%, 25%, 0.6)'
   // the below variables are initialized later:
   // baseFontSizeRem
   // defaultFontNames
};

import presenterBackgroundImageUrl from '../../Presenter/impl/view/images/background.size-optimized.jpg';

let presentationSI = {
   presenter: {
      share: {
         ui: {
            style: {
               font: {
                  baseFontSizeRem: 1,
                  defaultFontNames: 'Arial, Helvetica, sans-serif',
                  sizeRem: 1, // for optional overriding
                  names: 'Arial, Helvetica, sans-serif' // for optional overriding
               },
               color: {
                  background: 'hsla(217, 29%, 72%, 1)'
               }
            }
         }
      },
      private: {
         ui: {
            desktop: {
               navigationToPresenterWidthRatio: {
                  max: 0.5,
                  default: 0.3
               }
            },
            style: {
               backgroundColor: undefined,
               backgroundImageCSSValue: `url(${presenterBackgroundImageUrl})`,
               backgroundPositionCSSValue: undefined
            }
         },
         ux: {
            preferMaximizedDemoView: {
               initially: false,
               later: false
            }
         },
         demoContainerContent: {
            scrollContainer: {
               ui: {
                  backgroundColor: devStyle ? 'lightgray' : undefined
               }
            }
         }
      }
   }
};
presentationSI.presenter.parentInput = presentationSI;

p.baseFontSizeRem = presentationSI.presenter.share.ui.style.font.baseFontSizeRem;
p.defaultFontNames = presentationSI.presenter.share.ui.style.font.defaultFontNames;

// header
presentationSI.presenter.header = {
   share: {
      //
   },
   private: {
      ui: {
         style: {
            backgroundColor: 'hsla(213, 22%, 25%, 0.8)',
            backgroundImageCSSValue: undefined,
            backgroundPositionCSSValue: undefined
         },
         sizeRem: {
            min: {
               width: 7,
               //height:
            }
         }
      },
      ux: {
         scrolling: {
            verticalAccelerationFactor: p.verticalScrollAccelerationFactor
         }
      },
      title: {
         ui: {
            style: {
               marginRem: {
                  left: 0, right: 0, top: 0, bottom: 0
               },
               paddingEm: {
                  left: 1 / 1.8 * p.navigationItemFontSizeRem,
                  right: 1 / 1.8 * p.navigationItemFontSizeRem,
                  top: 0.4,
                  bottom: 0.6
               },
               font: {
                  sizeRem: 1.8,
                  names: '"Comic Sans MS", sans-serif'
               },
               lineHeightRem: 1.8,
               color: 'hsla(0, 60%, 77%, 1)',
               textShadowCSSValue: '0 0 0.1em hsla(0, 0%, 0%, 1)'
            }
         }
      }
   }
};
presentationSI.presenter.header.parentInput = presentationSI.presenter;

// demosNavigation
presentationSI.presenter.demosNavigation = {};
presentationSI.presenter.demosNavigation.share = {
   ui: {
      style: {
         color: {
            background: undefined
         }
      }
   },
   navigationItem: {
      ui: {
         style: {
            paddingRem: {
               top: (devStyle ? 0 : 0.25) * p.navigationItemFontSizeRem,
               right: (devStyle ? 0 : 0.25) * p.navigationItemFontSizeRem,
               bottom: (devStyle ? 0 : 0.16) * p.navigationItemFontSizeRem,
               left: (devStyle ? 0 : 0.25) * p.navigationItemFontSizeRem
            },
            backgroundColor: devStyle ?
               undefined : 'hsla(214, 40%, 99%, 0)',
            font: {
               sizeRem: p.navigationItemFontSizeRem,
               names: undefined
            },
         }
      }
   }
};
presentationSI.presenter.demosNavigation.private = {
   ui: {
      backgroundColor: devStyle ?
         'paleturquoise' : 'hsla(214, 40%, 99%, 0.9)'
   },
   tree: {
      ux: {
         expandOnInitialization: true
      },
      ui: {
         paddingRem: {
            left: (devStyle ? 0 : 1.3) * p.navigationItemFontSizeRem,
            right: (devStyle ? 0 : 1.3) * p.navigationItemFontSizeRem
         },
         rowHeightRem: (devStyle ? 3 : 2) * p.navigationItemFontSizeRem,
         structureLines: {
            blockWidthRem: 3.4 * p.navigationItemFontSizeRem,
            hLine: {
               color: devStyle ?
                  'yellow' : p.demosNavigationStructureLinesColor,
               thicknessRem:
               1 / (devStyle ? 18 : 3000) * p.navigationItemFontSizeRem,
               minThicknessPx: devStyle ? 3 : 1
            },
            vLine: {
               color: devStyle ?
                  'red' : p.demosNavigationStructureLinesColor,
               thicknessRem:
               1 / (devStyle ? 11 : 3000) * p.navigationItemFontSizeRem,
               minThicknessPx: devStyle ? 5 : 1
            }
         },
         expandCollapseButtons: {
            common: {
               backgroundColor: devStyle ?
                  'white' : 'hsla(214, 40%, 99%, 0.8)',
               states: {
                  normal: {
                     diameterRem: (
                                     devStyle ? 1 : 1.1) * p.navigationItemFontSizeRem,
                     boxShadow: {
                        cssValue: devStyle ?
                           '0 0 0 0.0625rem hsla(203, 84%, 30%, 1)'
                           : `0 0 0 0.0625rem ${p.demosNavigationStructureLinesColor}`,
                        maxThickness: {
                           leftRem: devStyle ? 0.0625 : 0.0625
                        }
                     }
                  },
                  hovered: {
                     diameterRem: (devStyle ?
                        1.05 : 1.15) * p.navigationItemFontSizeRem,
                     boxShadow: {
                        cssValue: devStyle ?
                           '0 0 0 0.0625rem hsla(203, 84%, 50%, 1)'
                           :
                           `
                              0 0 0 0.0625rem ${p.demosNavigationStructureLinesColor}
                              ,
                              0 0
                              ${0.4 / 18 * 16 * p.navigationItemFontSizeRem}rem
                              ${0.1 / 18 * 16 * p.navigationItemFontSizeRem}rem
                              hsla(45, 86%, 55%, 1)
                           `,
                        maxThickness: {
                           leftRem: devStyle ?
                              0.0625
                              :
                              (0.0625 +
                               (0.4 + 0.1) / 18 * 16 * p.navigationItemFontSizeRem)
                        }
                     }
                  },
                  focused: {
                     boxShadow: {
                        cssValue: devStyle ?
                           `0 0 0 0.0625rem hsla(203, 84%, 30%, 0.84)
                            ,
                            0 0 0.0625rem 0.1875rem hsla(147, 84%, 39%, 1)`
                           :
                           `
                              0 0 0 0.0625rem ${p.demosNavigationStructureLinesColor}
                              ,
                              0 0
                              ${0.4 / 18 * 16 * p.navigationItemFontSizeRem}rem
                              ${0.1 / 18 * 16 * p.navigationItemFontSizeRem}rem
                              hsla(45, 86%, 55%, 1)
                           `,
                        maxThickness: {
                           leftRem: devStyle ?
                              0.0625 + 0.1875
                              :
                              (0.0625 +
                               (0.4 + 0.1) / 18 * 16 * p.navigationItemFontSizeRem)
                        }
                     }
                  }
               }
            },
            expand: {
               signColor: devStyle ?
                  'green' : 'hsla(10, 40%, 70%, 1)',
               backgroundImageCSSValue: `url(\'data:image/svg+xml;utf8,<svg version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='{signColor}' d='m 18.07627,9.9745767 -4.050847,0 0,-4.050848 c 0,-1.1180338 -0.907389,-2.0254236 -2.025423,-2.0254236 -1.118034,0 -2.0254235,0.9073898 -2.0254235,2.0254236 l 0.071905,4.050848 -4.1227503,0 c -1.1180338,0 -2.0254236,0.9073893 -2.0254236,2.0254233 0,1.118033 0.9073898,2.025423 2.0254236,2.025423 l 4.1227503,-0.0719 -0.071905,4.122749 c 0,1.118034 0.9073895,2.025425 2.0254235,2.025425 1.118034,0 2.025423,-0.907391 2.025423,-2.025425 l 0,-4.122749 4.050847,0.0719 c 1.118034,0 2.025425,-0.90739 2.025425,-2.025423 0,-1.118034 -0.907391,-2.0254233 -2.025425,-2.0254233 z' /></svg>\')`
            },
            collapse: {
               signColor: devStyle ?
                  'red' : 'hsla(10, 40%, 70%, 1)',
               backgroundImageCSSValue: `url(\'data:image/svg+xml;utf8,<svg version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='{signColor}' d='m 18.07627,9.9745767 -12.1525388,0 c -1.1180338,0 -2.0254236,0.9073893 -2.0254236,2.0254233 0,1.118033 0.9073898,2.025423 2.0254236,2.025423 12.1525388,0 5.0499608,-0.126066 12.1525388,0 1.118034,0 2.025425,-0.90739 2.025425,-2.025423 0,-1.118034 -0.907391,-2.0254233 -2.025425,-2.0254233 z' /></svg>\')`
            }
         },
         itemContainer: {
            paddingRem: {
               top: (devStyle ? 0.5 : 0) * p.navigationItemFontSizeRem,
               right: (devStyle ? 0.5 : 0) * p.navigationItemFontSizeRem,
               bottom: (devStyle ? 0.5 : 0) * p.navigationItemFontSizeRem,
               left: (devStyle ? 0.5 : 0) * p.navigationItemFontSizeRem
            },
            border: {
               thicknessRem: devStyle ? 1 / 16 : 0,
               color: devStyle ?
                  'red' : 'hsla(214, 40%, 99%, 1)',
               cssStyle: 'solid'
            },
            borderRadiusRem: p.navigationItemFontSizeRem / 2,
            boxShadow: {
               cssValue: devStyle ?
                  `${0.3 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   ${-0.3 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   ${1 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   hsla(214, 40%, 99%, 1)
                  ,
                   ${-0.3 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   ${0.3 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   ${1 / 18 * 16 * p.navigationItemFontSizeRem}rem
                   hsla(214, 40%, 99%, 1)
                  `
                  : '0 0 0 0',
               maxThickness: {
                  rightRem: devStyle ?
                     (0.3 + 1) / 3 / 18 * 16 * p.navigationItemFontSizeRem
                     :
                     0
               }
            },
            backgroundColor: devStyle ?
               'hsla(44, 84%, 92%, 0.5)' : 'hsla(0, 0%, 0%, 0)',
            rstLabelContainer: {
               marginRem: {
                  bottom: 0.15 * p.navigationItemFontSizeRem,
                  left: 0
               },
               paddingRightRem: 0
            }
         }
      }
   }
};
presentationSI.presenter.demosNavigation.parentInput = presentationSI.presenter;

// demoNavigationItem
presentationSI.presenter.demosNavigation.demoNavigationItem = {
   private: {
      notSelected: {
         ui: {
            style: {
               backgroundColor: undefined,
               color: 'hsla(91, 100%, 18%, 1)',
               textDecoration: 'none'
            }
         }
      },
      selected: {
         ui: {
            style: {
               backgroundColor: 'hsla(61, 100%, 88%, 0.8)',
               color: 'hsla(91, 100%, 18%, 1)',
               textDecoration: 'none'
            }
         }
      }
   }
};
presentationSI.presenter.demosNavigation.demoNavigationItem.parentInput = presentationSI.presenter.demosNavigation;

// groupingNavigationItem
presentationSI.presenter.demosNavigation.groupingNavigationItem = {
   private: {
      ui: {
         style: {
            backgroundColor: undefined,
            color: 'hsla(46, 62%, 23%, 1)',
            textDecoration: undefined
         }
      }
   }
};
presentationSI.presenter.demosNavigation.groupingNavigationItem.parentInput = presentationSI.presenter.demosNavigation;

// demoContainer
presentationSI.presenter.demoContainer = {
   share: {
      ui: {
         style: {
            color: {
               background: 'hsla(214, 40%, 90%, 0.4)'
            }
         }
      }
   },
   private: {
      //
   }
};
presentationSI.presenter.demoContainer.parentInput = presentationSI.presenter;
presentationSI.presenter.demoContainer.inNavigationMode = {
   private: {
      ui: {
         backgroundColor: devStyle ? '#633A3A' : undefined,
         bordersIfDemoWantsBorder: {
            top: null,
            right: null,
            bottom: null,
            left: {
               thicknessPx: 1,
               color: 'hsla(214, 40%, 51%, 1)'
            }
         }
      }
   },
   parentInput: presentationSI.presenter.demoContainer
};

presentationSI.presenter.demoContainer.inMaximizedMode = {
   private: {
      ui: {
         backgroundColor: devStyle ? '#3B633A' : undefined,
         bordersIfDemoWantsBorder: {
            top: null,
            right: null,
            bottom: null,
            left: null
         }
      },
      navigationButton: {
         ui: {
            marginRem: {
               top: devStyle ? 0.8 : 1.3,
               right: devStyle ? 0.8 : 1.3,
               bottom: devStyle ? 0.8 : 1.3,
               left: devStyle ? 0.8 : 1.3
            },
            paddingEm: {
               top: 0.15, right: 0.35, bottom: 0.26, left: 0.35
            },
            style: {
               backgroundColor: devStyle ?
                  'hsla(10, 43%, 69%, 1)' : 'hsla(214, 50%, 99%, 0.75)',
               color: devStyle ?
                  'hsla(229, 70%, 50%, 1)' : 'hsla(0, 25%, 31%, 1)',
               font: {
                  sizeRem: 1.05,
                  names: 'Arial, Helvetica, sans-serif' // TODO: handle case of undefined
               }
            }
         }
      }
   },
   parentInput: presentationSI.presenter.demoContainer
};

// footer
presentationSI.presenter.footer = {
   share: {
      //
   },
   private: {
      ui: {
         style: {
            backgroundColorCSSValue: 'hsla(45, 47%, 19%, 0.7)'
         }
      },
      ux: {
         scrolling: {
            verticalAccelerationFactor: p.verticalScrollAccelerationFactor
         }
      },
   }
};
presentationSI.presenter.footer.parentInput = presentationSI.presenter;

export default function getSettings() { return presentationSI; }