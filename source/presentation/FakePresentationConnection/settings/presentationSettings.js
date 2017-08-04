// SI - settings input

let p = { // dictionary for easy access to the main values
   // the below variables are initialized later:
   // baseFontSizeRem
   // defaultFontNames
   // navigationItemFont: { sizeRem, names }
};

let presentationSI = {
   presenter: {
      share: {
         ui: {
            style: {
               font: {
                  baseFontSizeRem: 1,
                  defaultFontNames: 'Futura, sans-serif'
               }
            }
         }
      },
      private: {
         ui: {
            desktop: {
               navigationToPresenterWidthRatio: {
                  max: 0.7,
                  default: 0.3
               }
            }
         },
         ux: {
            preferMaximizedDemoView: {
               initially: false,
               later: false
            }
         }
      }
   }
};
presentationSI.presenter.parentInput = presentationSI;

p.baseFontSizeRem = presentationSI.presenter.share.ui.style.font.baseFontSizeRem;
p.defaultFontNames = presentationSI.presenter.share.ui.style.font.defaultFontNames;

// demosNavigation
presentationSI.presenter.demosNavigation = {};
presentationSI.presenter.demosNavigation.share = {
   ui: {
      style: {
         navigationItemFont: {
            sizeRem: 18/16,
            names: undefined
         }
      }
   }
};
p.navigationItemFont = presentationSI.presenter.demosNavigation.share.ui.style.navigationItemFont;
presentationSI.presenter.demosNavigation.private = {
   tree: {
      ux: {
         expandOnInitialization: true
      },
      ui: {
         paddingRem: {
            left: 1 * p.navigationItemFont.sizeRem,
            right: 1 * p.navigationItemFont.sizeRem
         },
         rowHeightRem: 2.7 * p.navigationItemFont.sizeRem,
         structureLines: {
            blockWidthRem: 3.5 * p.navigationItemFont.sizeRem,
            hLine: {
               color: 'yellow',
               thicknessRem: 1 / 18 * p.navigationItemFont.sizeRem,
               minThicknessPx: 3
            },
            vLine: {
               color: 'red',
               thicknessRem: 1 / 11 * p.navigationItemFont.sizeRem,
               minThicknessPx: 5
            }
         },
         expandCollapseButtons: {
            common: {
               backgroundColor: 'white',
               states: {
                  normal: {
                     diameterRem: 1 * p.navigationItemFont.sizeRem,
                     boxShadow: {
                        cssValue: '0 0 0 0.0625rem hsla(203, 84%, 30%, 1)',
                        maxThickness: {
                           leftRem: 0.0625
                        }
                     }
                  },
                  hovered: {
                     diameterRem: 1.05 * p.navigationItemFont.sizeRem,
                     boxShadow: {
                        cssValue: '0 0 0 0.0625rem hsla(203, 84%, 50%, 1)',
                        maxThickness: {
                           leftRem: 0.0625
                        }
                     }
                  },
                  focused: {
                     boxShadow: {
                        cssValue: '0 0 0 0.0625rem hsla(203, 84%, 30%, 0.84), 0 0 0.0625rem 0.1875rem hsla(147, 84%, 39%, 1)',
                        maxThickness: {
                           leftRem: 0.1875
                        }
                     }
                  }
               }
            },
            expand: {
               signColor: 'green',
               backgroundImageCSSValue: 'url(\'data:image/svg+xml;utf8,<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="{signColor}" d="m 18.07627,9.9745767 -4.050847,0 0,-4.050848 c 0,-1.1180338 -0.907389,-2.0254236 -2.025423,-2.0254236 -1.118034,0 -2.0254235,0.9073898 -2.0254235,2.0254236 l 0.071905,4.050848 -4.1227503,0 c -1.1180338,0 -2.0254236,0.9073893 -2.0254236,2.0254233 0,1.118033 0.9073898,2.025423 2.0254236,2.025423 l 4.1227503,-0.0719 -0.071905,4.122749 c 0,1.118034 0.9073895,2.025425 2.0254235,2.025425 1.118034,0 2.025423,-0.907391 2.025423,-2.025425 l 0,-4.122749 4.050847,0.0719 c 1.118034,0 2.025425,-0.90739 2.025425,-2.025423 0,-1.118034 -0.907391,-2.0254233 -2.025425,-2.0254233 z" /></svg>\')'
            },
            collapse: {
               signColor: 'red',
               backgroundImageCSSValue: 'url(\'data:image/svg+xml;utf8,<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="{signColor}" d="m 18.07627,9.9745767 -12.1525388,0 c -1.1180338,0 -2.0254236,0.9073893 -2.0254236,2.0254233 0,1.118033 0.9073898,2.025423 2.0254236,2.025423 12.1525388,0 5.0499608,-0.126066 12.1525388,0 1.118034,0 2.025425,-0.90739 2.025425,-2.025423 0,-1.118034 -0.907391,-2.0254233 -2.025425,-2.0254233 z" /></svg>\')'
            }
         },
         itemContainer: {
            //minWidthRem: 0,
            paddingRem: {
               top: 0.5 * p.navigationItemFont.sizeRem,
               right: 0.5 * p.navigationItemFont.sizeRem,
               bottom: 0.5 * p.navigationItemFont.sizeRem,
               left: 0.5 * p.navigationItemFont.sizeRem
            },
            border: {
               thicknessRem: 1/16,
               color: 'red',
               cssStyle: 'solid'
            },
            borderRadiusRem: p.navigationItemFont.sizeRem / 2,
            boxShadow: {
               cssValue: '0 0 0 0',
               maxThickness: {
                  rightRem: 0
               }
            },
            backgroundColor: 'hsla(44, 84%, 92%, 0.5)',
            labelContainer: {
               paddingRightRem: 0
            }
         }
      }
   }
};
presentationSI.presenter.demosNavigation.parentInput = presentationSI.presenter;

// demoNavigationItem
presentationSI.presenter.demosNavigation.demoNavigationItem = {
   //
};
presentationSI.presenter.demosNavigation.demoNavigationItem.parentInput = presentationSI.presenter.demosNavigation;

// groupingNavigationItem
presentationSI.presenter.demosNavigation.groupingNavigationItem = {
   //
};
presentationSI.presenter.demosNavigation.groupingNavigationItem.parentInput = presentationSI.presenter.demosNavigation;

// demoContainer
presentationSI.presenter.demoContainer = {
   share: {
      ui: {
         //
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
         contentPaddingRem: {
            top: 3,
            right: 3,
            bottom: 3,
            left: 3
         }
      }
   },
   parentInput: presentationSI.presenter.demoContainer
};

presentationSI.presenter.demoContainer.inMaximizedMode = {
   private: {
      ui: {
         contentPaddingRem: {
            top: 3,
            right: 3,
            bottom: 3,
            left: 3
         }
      }
   },
   parentInput: presentationSI.presenter.demoContainer
};

// navigationButton
presentationSI.presenter.demoContainer.inMaximizedMode.navigationButton = {
   private: {
      ui: {
         style: {
            font: {
               sizeRem: 1,
               names: undefined
            }
         }
      }
   }
};
presentationSI.presenter.demoContainer.inMaximizedMode.navigationButton.parentInput = presentationSI.presenter.demoContainer.inMaximizedMode;

// maximizeButton
presentationSI.presenter.demoContainer.inNavigationMode.maximizeButton = {
   private: {
      ui: {
         //
      }
   }
};
presentationSI.presenter.demoContainer.inNavigationMode.maximizeButton.parentInput = presentationSI.presenter.demoContainer.inNavigationMode;

export default function getSettings() { return presentationSI; }