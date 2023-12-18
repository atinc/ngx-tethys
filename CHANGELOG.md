# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [16.2.0-next.5](https://github.com/atinc/ngx-tethys/compare/16.2.0-next.4...16.2.0-next.5) (2023-12-18)


### Bug Fixes

* **cascader:** fix style for long text ([#2939](https://github.com/atinc/ngx-tethys/issues/2939)) ([89653e1](https://github.com/atinc/ngx-tethys/commit/89653e18b571187e8e987451ef807d04930bf7cf))
* **select:** markForCheck when open ([#2971](https://github.com/atinc/ngx-tethys/issues/2971)) ([#2973](https://github.com/atinc/ngx-tethys/issues/2973)) ([03e10d4](https://github.com/atinc/ngx-tethys/commit/03e10d47f4717503037511b5eb3ee1d29dd70681))
* **select:** remove focus() when close panel #INFR-10914 ([#2968](https://github.com/atinc/ngx-tethys/issues/2968)) ([94463cf](https://github.com/atinc/ngx-tethys/commit/94463cf920a4caee71568593add2eecbcc23f1e2)), closes [#INFR-10914](https://github.com/atinc/ngx-tethys/issues/INFR-10914)
* **tree-select:** fix tree select overlay style and position #INFR-10880 ([e07df4b](https://github.com/atinc/ngx-tethys/commit/e07df4b0bf630ec5af50ff1156effdf9d6f6af2e)), closes [#INFR-10880](https://github.com/atinc/ngx-tethys/issues/INFR-10880)


### Features

* **cascader:** add service for cascader #INFR-10254 ([#2894](https://github.com/atinc/ngx-tethys/issues/2894)) ([f516632](https://github.com/atinc/ngx-tethys/commit/f516632e23856c0a48e3248aa99420476bf256c4)), closes [#INFR-10254](https://github.com/atinc/ngx-tethys/issues/INFR-10254)
* **cascader:** add thyAutoExpand #INFR-10701 ([#2930](https://github.com/atinc/ngx-tethys/issues/2930)) ([1cc1f73](https://github.com/atinc/ngx-tethys/commit/1cc1f73a43ed9adfff8d3be9d18f319c128e9205)), closes [#INFR-10701](https://github.com/atinc/ngx-tethys/issues/INFR-10701)
* **datePicker:** date-picker support quarter(#INFR-10719) ([#2967](https://github.com/atinc/ngx-tethys/issues/2967)) ([1666961](https://github.com/atinc/ngx-tethys/commit/1666961535eea5c648b8b6f8921e256d2512107f)), closes [#INFR-10719](https://github.com/atinc/ngx-tethys/issues/INFR-10719) [#INFR-10719](https://github.com/atinc/ngx-tethys/issues/INFR-10719)
* **property:** property-item add thyEditingChange #INFR-10910 ([#2969](https://github.com/atinc/ngx-tethys/issues/2969)) ([573d315](https://github.com/atinc/ngx-tethys/commit/573d315508111768cc65d311b9411612814e0c82)), closes [#INFR-10910](https://github.com/atinc/ngx-tethys/issues/INFR-10910)
* support animations for cascader, tree-select, time-picker INFR-7856 ([#2950](https://github.com/atinc/ngx-tethys/issues/2950)) ([e41fa5a](https://github.com/atinc/ngx-tethys/commit/e41fa5a1c23e81306b10ef73dc1fcac0ddcbafe1))
* **table:** optimize header fixed th border style #INFR-10891 ([#2965](https://github.com/atinc/ngx-tethys/issues/2965)) ([b9c2a92](https://github.com/atinc/ngx-tethys/commit/b9c2a92a4c94e98288f507232f121674c4f5ca19)), closes [#INFR-10891](https://github.com/atinc/ngx-tethys/issues/INFR-10891)



# [16.2.0-next.4](https://github.com/atinc/ngx-tethys/compare/16.2.0-next.3...16.2.0-next.4) (2023-12-07)


### Bug Fixes

* **core:** adjust animation scale from 0.5 to 0.9 #INFR-10876 ([#2952](https://github.com/atinc/ngx-tethys/issues/2952)) ([b371ad1](https://github.com/atinc/ngx-tethys/commit/b371ad11ac0485544161aecfb4bf6773bc48138d)), closes [#INFR-10876](https://github.com/atinc/ngx-tethys/issues/INFR-10876)



# [16.2.0-next.3](https://github.com/atinc/ngx-tethys/compare/16.2.0-next.2...16.2.0-next.3) (2023-12-06)


### Bug Fixes

* **core:** export animations from core module INFR-7856 ([#2942](https://github.com/atinc/ngx-tethys/issues/2942)) ([48a33f2](https://github.com/atinc/ngx-tethys/commit/48a33f2b9c9e3b6dd7fe713d1235b6591618a2db))
* **shared:** trigger ng ngOnChanges use setInput for thyViewOutlet #INFR-10730 ([#2947](https://github.com/atinc/ngx-tethys/issues/2947)) ([afc7b58](https://github.com/atinc/ngx-tethys/commit/afc7b585cfc62f9317a1dec3d5fc646cfcf0c386)), closes [#INFR-10730](https://github.com/atinc/ngx-tethys/issues/INFR-10730)
* **slider:** don't change value when slider is display:none; #INFR-10717 [@wangkai](https://github.com/wangkai) ([#2937](https://github.com/atinc/ngx-tethys/issues/2937)) ([e1a7635](https://github.com/atinc/ngx-tethys/commit/e1a7635f52ea0f72ac154436df8a15d8c64902ec)), closes [#INFR-10717](https://github.com/atinc/ngx-tethys/issues/INFR-10717) [#INFR-10717](https://github.com/atinc/ngx-tethys/issues/INFR-10717)


### Features

* **popover:** support disable animation #INFR-10811 ([#2943](https://github.com/atinc/ngx-tethys/issues/2943)) ([0e30d02](https://github.com/atinc/ngx-tethys/commit/0e30d021c933bb29ec18224f2d4cb6b8b81cfcfc)), closes [#INFR-10811](https://github.com/atinc/ngx-tethys/issues/INFR-10811)
* **select:**  support thyOptions #INFR-10686 ([#2933](https://github.com/atinc/ngx-tethys/issues/2933)) ([6fe2fd1](https://github.com/atinc/ngx-tethys/commit/6fe2fd17797d9651e275126bfb22643785cdc4a7)), closes [#INFR-10686](https://github.com/atinc/ngx-tethys/issues/INFR-10686) [#INFR-10686](https://github.com/atinc/ngx-tethys/issues/INFR-10686) [#INFR-10686](https://github.com/atinc/ngx-tethys/issues/INFR-10686) [#INFR-10686](https://github.com/atinc/ngx-tethys/issues/INFR-10686) [#INFR-10686](https://github.com/atinc/ngx-tethys/issues/INFR-10686)
* support animation for select and popover #INFR-10478 ([#2931](https://github.com/atinc/ngx-tethys/issues/2931)) ([fe8026b](https://github.com/atinc/ngx-tethys/commit/fe8026b94fda7f4f176d471aaa385bee3c32f674)), closes [#INFR-10478](https://github.com/atinc/ngx-tethys/issues/INFR-10478)



# [16.2.0-next.2](https://github.com/atinc/ngx-tethys/compare/16.1.16...16.2.0-next.2) (2023-12-04)


### Bug Fixes

* **action:** #INFR-10604 fix disabled styles,when use <thy-action> ([#2915](https://github.com/atinc/ngx-tethys/issues/2915)) ([e9fc0c5](https://github.com/atinc/ngx-tethys/commit/e9fc0c52dae156fb007805d174e6b51dabffcfd4))
* **layout:** fix selector for thyLayout and thyContent #INFR-10664 ([#2927](https://github.com/atinc/ngx-tethys/issues/2927)) ([b38c0d1](https://github.com/atinc/ngx-tethys/commit/b38c0d13b3cb39462e09ae206a414764dfe94eb5)), closes [#INFR-10664](https://github.com/atinc/ngx-tethys/issues/INFR-10664)


### Features

* **layout:** add directives for the layout component series and refactor existing layout components #INFR-10500 ([#2919](https://github.com/atinc/ngx-tethys/issues/2919)) ([293ba66](https://github.com/atinc/ngx-tethys/commit/293ba66314a55dce1bb2ddd3d8364f9aaf066a85)), closes [#INFR-10500](https://github.com/atinc/ngx-tethys/issues/INFR-10500)
* **select:** #INFR-5471 custom-select support display avatar or icon… ([#2922](https://github.com/atinc/ngx-tethys/issues/2922)) ([bd0f27c](https://github.com/atinc/ngx-tethys/commit/bd0f27cb915ff49d31266116d16aeebdd40cea56)), closes [#INFR-5471](https://github.com/atinc/ngx-tethys/issues/INFR-5471) [#INFR-5471](https://github.com/atinc/ngx-tethys/issues/INFR-5471) [#2855](https://github.com/atinc/ngx-tethys/issues/2855)
* **table:** optimization of Table Skeleton Screen Details #INFR-10506 #INFR-10505 ([#2921](https://github.com/atinc/ngx-tethys/issues/2921)) ([80fa550](https://github.com/atinc/ngx-tethys/commit/80fa5501f576f04be9cd9078aa15104ef9bb52e4)), closes [#INFR-10506](https://github.com/atinc/ngx-tethys/issues/INFR-10506) [#INFR-10505](https://github.com/atinc/ngx-tethys/issues/INFR-10505)
* **table:** table support checkbox skeleton #INFR-10503 ([#2928](https://github.com/atinc/ngx-tethys/issues/2928)) ([320dc7b](https://github.com/atinc/ngx-tethys/commit/320dc7bb123e8daffbb61e8bf55683147520fafe)), closes [#INFR-10503](https://github.com/atinc/ngx-tethys/issues/INFR-10503)



## [16.1.16](https://github.com/atinc/ngx-tethys/compare/16.1.15...16.1.16) (2023-11-24)


### Bug Fixes

* **anchor:** set  style for horizontal display #INFR-10451 ([#2914](https://github.com/atinc/ngx-tethys/issues/2914)) ([58bef8a](https://github.com/atinc/ngx-tethys/commit/58bef8a86445e32337490a0b7b42f71875bcd267)), closes [#INFR-10451](https://github.com/atinc/ngx-tethys/issues/INFR-10451)
* **switch:** the switch thyDisabled does not take effect when using ngModel #INFR-10583 ([#2910](https://github.com/atinc/ngx-tethys/issues/2910)) ([700e3b7](https://github.com/atinc/ngx-tethys/commit/700e3b7bddd8d93bda24f105f53d6ed135dc31a2)), closes [#INFR-10583](https://github.com/atinc/ngx-tethys/issues/INFR-10583)
* **time-picker:** the time-picker thyDisabled does not take effect when using ngModel #INFR-7476 ([#2911](https://github.com/atinc/ngx-tethys/issues/2911)) ([4c9f17a](https://github.com/atinc/ngx-tethys/commit/4c9f17ab20fcdbdbdba88e41c707814641637956)), closes [#INFR-7476](https://github.com/atinc/ngx-tethys/issues/INFR-7476) [#INFR-10583](https://github.com/atinc/ngx-tethys/issues/INFR-10583) [#INFR-10583](https://github.com/atinc/ngx-tethys/issues/INFR-10583)


### Features

* **date-picker:** input formatdate sync withTime prop #INFR-10513 ([#2905](https://github.com/atinc/ngx-tethys/issues/2905)) ([3e893ab](https://github.com/atinc/ngx-tethys/commit/3e893ab33f6e5fad14212b13a7d2fd78c93209f1)), closes [#INFR-10513](https://github.com/atinc/ngx-tethys/issues/INFR-10513)
* **switch:** support thyLoading and loading animation INFR-10495 ([#2917](https://github.com/atinc/ngx-tethys/issues/2917)) ([7298c32](https://github.com/atinc/ngx-tethys/commit/7298c32b5a78994100d599a159eec3b91a44e715))



## [16.1.15](https://github.com/atinc/ngx-tethys/compare/16.1.14...16.1.15) (2023-11-23)


### Bug Fixes

* **anchor:** set the sliding style for horizontal display #INFR-10451 ([#2907](https://github.com/atinc/ngx-tethys/issues/2907)) ([adb7c59](https://github.com/atinc/ngx-tethys/commit/adb7c5905bc6d0e95efcc62a9f2b9f026aa6492b)), closes [#INFR-10451](https://github.com/atinc/ngx-tethys/issues/INFR-10451)


### Features

* **dialog:** thy-dialog-container animation to enter add markForCheck #INFR-10586 ([#2908](https://github.com/atinc/ngx-tethys/issues/2908)) ([cddcca2](https://github.com/atinc/ngx-tethys/commit/cddcca2b80e95ce133a84a5b9bc22f54e7b1360b)), closes [#INFR-10586](https://github.com/atinc/ngx-tethys/issues/INFR-10586)



## [16.1.14](https://github.com/atinc/ngx-tethys/compare/16.1.13...16.1.14) (2023-11-20)


### Bug Fixes

* **date-picker:** adjust updateReadableDate function INFR-10167 ([#2900](https://github.com/atinc/ngx-tethys/issues/2900)) ([4c2f14a](https://github.com/atinc/ngx-tethys/commit/4c2f14a59e86264e39343497dbae8aee4fba7440))
* **input:** adjust left margin of prefix element and right margin of suffix element #INFR-10515 ([8ad60ce](https://github.com/atinc/ngx-tethys/commit/8ad60ce0272e6fbc1313f37ce763455f6d13f1ec)), closes [#INFR-10515](https://github.com/atinc/ngx-tethys/issues/INFR-10515)


### Features

* **anchor:** support horizontal display #INFR-10451 ([#2901](https://github.com/atinc/ngx-tethys/issues/2901)) ([bb5d10a](https://github.com/atinc/ngx-tethys/commit/bb5d10a5dde4832a496c24137750e635fead2ec5)), closes [#INFR-10451](https://github.com/atinc/ngx-tethys/issues/INFR-10451)



## [16.1.13](https://github.com/atinc/ngx-tethys/compare/16.1.12...16.1.13) (2023-11-16)


### Bug Fixes

* **cascader:** fix bug of selectall #INFR-10448 ([#2898](https://github.com/atinc/ngx-tethys/issues/2898)) ([974ca51](https://github.com/atinc/ngx-tethys/commit/974ca51cd160958d0874d6ca00bf9cba08529e84)), closes [#INFR-10448](https://github.com/atinc/ngx-tethys/issues/INFR-10448)



## [16.1.12](https://github.com/atinc/ngx-tethys/compare/16.1.11...16.1.12) (2023-11-16)


### Bug Fixes

* **date-picker:** should update display value when thyFormat change #INFR-10428 ([#2897](https://github.com/atinc/ngx-tethys/issues/2897)) ([0581693](https://github.com/atinc/ngx-tethys/commit/05816939dba507c7487c6ee6864d4d89f67f718b)), closes [#INFR-10428](https://github.com/atinc/ngx-tethys/issues/INFR-10428)



## [16.1.11](https://github.com/atinc/ngx-tethys/compare/16.1.10...16.1.11) (2023-11-15)


### Features

* **cascader:** support quick selection all leafs when thyIsOnlySelectLeaf is true #INFR-10253 ([#2891](https://github.com/atinc/ngx-tethys/issues/2891)) ([8087172](https://github.com/atinc/ngx-tethys/commit/80871723dc11e4dd23e1beda8ef18f830d1c3251)), closes [#INFR-10253](https://github.com/atinc/ngx-tethys/issues/INFR-10253)
* **dialog:** #INFR-10411 prohibit operations when closing animation in dialog container ([#2893](https://github.com/atinc/ngx-tethys/issues/2893)) ([35d2df2](https://github.com/atinc/ngx-tethys/commit/35d2df207012a0f1af3f20ab39f9cbe94e56690e)), closes [#INFR-10411](https://github.com/atinc/ngx-tethys/issues/INFR-10411)



## [16.1.10](https://github.com/atinc/ngx-tethys/compare/16.1.9...16.1.10) (2023-11-08)


### Bug Fixes

* **cascade:** fix trigger two changes #INFR_10249 ([#2888](https://github.com/atinc/ngx-tethys/issues/2888)) ([8edf5cc](https://github.com/atinc/ngx-tethys/commit/8edf5cc625777c7046adbcc107d8f0f66417b64b)), closes [#INFR_10249](https://github.com/atinc/ngx-tethys/issues/INFR_10249)
* **cascader:** fix trigger area and style #INFR-10245 ([#2887](https://github.com/atinc/ngx-tethys/issues/2887)) ([9c58775](https://github.com/atinc/ngx-tethys/commit/9c58775b622c783f357decf571ac927a8d33d3ac)), closes [#INFR-10245](https://github.com/atinc/ngx-tethys/issues/INFR-10245)
* **radio-group:** set radio group disabled default value #INFR-10263 ([#2889](https://github.com/atinc/ngx-tethys/issues/2889)) ([e1147d0](https://github.com/atinc/ngx-tethys/commit/e1147d0247a8b861f924c2e3143c5f728028f0ed)), closes [#INFR-10263](https://github.com/atinc/ngx-tethys/issues/INFR-10263)


### Features

* **date-picker:** date picker allowed input date ([#2886](https://github.com/atinc/ngx-tethys/issues/2886)) ([4598356](https://github.com/atinc/ngx-tethys/commit/4598356764dcb5002b9951de787c06d8f1199808))



## [16.1.9](https://github.com/atinc/ngx-tethys/compare/16.1.8...16.1.9) (2023-11-02)


### Features

* **date-picker:** THY_DATE_PICKER_CONFIG support weekStartsOn and set default value 1 #INFR-10198 ([#2882](https://github.com/atinc/ngx-tethys/issues/2882)) ([8377887](https://github.com/atinc/ngx-tethys/commit/837788769c8cbeabbad39bfff23033739b1b751c)), closes [#INFR-10198](https://github.com/atinc/ngx-tethys/issues/INFR-10198) [#INFR-10198](https://github.com/atinc/ngx-tethys/issues/INFR-10198)



## [16.1.8](https://github.com/atinc/ngx-tethys/compare/16.1.7...16.1.8) (2023-11-02)


### Bug Fixes

* **cascader:** reset selectionModel when writeValue #INFR-10101 ([#2883](https://github.com/atinc/ngx-tethys/issues/2883)) ([56496fd](https://github.com/atinc/ngx-tethys/commit/56496fd31cc62bd113543f34cb2bad2b2f0f5d6d)), closes [#INFR-10101](https://github.com/atinc/ngx-tethys/issues/INFR-10101)


### Features

* **date-picker:** add event thyDateChange and deprecated shortcutValueChange #INFR-9829 ([#2865](https://github.com/atinc/ngx-tethys/issues/2865)) ([adf0f6b](https://github.com/atinc/ngx-tethys/commit/adf0f6b6fb05993ad811b62a13d64d9da86e46ee)), closes [#INFR-9829](https://github.com/atinc/ngx-tethys/issues/INFR-9829)



## [16.1.7](https://github.com/atinc/ngx-tethys/compare/16.1.6...16.1.7) (2023-11-02)


### Features

* **cascader:** search and select all nodes when isOnlySelectLeaf is false #INFR-10101 ([#2873](https://github.com/atinc/ngx-tethys/issues/2873)) ([f0d6751](https://github.com/atinc/ngx-tethys/commit/f0d67511309a092e9d7364009c9082d471e58517)), closes [#INFR-10101](https://github.com/atinc/ngx-tethys/issues/INFR-10101)
* **select:** #INFR-10094 dispatch toggle select panel not close when thyShowSearch is true ([#2872](https://github.com/atinc/ngx-tethys/issues/2872)) ([10c2ec1](https://github.com/atinc/ngx-tethys/commit/10c2ec19d8d6ff0024283d8a4f6c3a243eac717b))



## [16.1.6](https://github.com/atinc/ngx-tethys/compare/16.2.0-next...16.1.6) (2023-10-27)


### Bug Fixes

* **check:** fix form-check style(#INFR-9102) ([#2837](https://github.com/atinc/ngx-tethys/issues/2837)) ([40eddcf](https://github.com/atinc/ngx-tethys/commit/40eddcf66038b8bd52db1ec9fe7c81b89ab3dc02)), closes [#INFR-9102](https://github.com/atinc/ngx-tethys/issues/INFR-9102)
* **input-number:** fix input non-number show error #INFR-10053 ([#2862](https://github.com/atinc/ngx-tethys/issues/2862)) ([7749771](https://github.com/atinc/ngx-tethys/commit/7749771ea63659961121aa25f381f15ac0d67970)), closes [#INFR-10053](https://github.com/atinc/ngx-tethys/issues/INFR-10053)
* **input-number:** fix input number suffix not effect #INFR-10053 ([#2859](https://github.com/atinc/ngx-tethys/issues/2859)) ([b411b5a](https://github.com/atinc/ngx-tethys/commit/b411b5ab769360c50c37667f907a9d5a56047e3f)), closes [#INFR-10053](https://github.com/atinc/ngx-tethys/issues/INFR-10053)
* **radio:** fix radio group thyDisabled #INFR-9788 ([#2858](https://github.com/atinc/ngx-tethys/issues/2858)) ([1569e3c](https://github.com/atinc/ngx-tethys/commit/1569e3cbbfcadcceca804baf37c5deea71461be1)), closes [#INFR-9788](https://github.com/atinc/ngx-tethys/issues/INFR-9788)


### Features

* add restoreFocusOptions to control previously element focusing #INFR-9782 ([#2860](https://github.com/atinc/ngx-tethys/issues/2860)) ([da6ef88](https://github.com/atinc/ngx-tethys/commit/da6ef88cbe8ed135651628106e4084015803de6a)), closes [#INFR-9782](https://github.com/atinc/ngx-tethys/issues/INFR-9782)



## [16.1.5](https://github.com/atinc/ngx-tethys/compare/16.1.4...16.1.5) (2023-10-12)


### Bug Fixes

* **date-picker:** fix bug for get panelMode #INFR-9916 ([#2848](https://github.com/atinc/ngx-tethys/issues/2848)) ([7f6dd84](https://github.com/atinc/ngx-tethys/commit/7f6dd843ba1ecc5400e3f24b3678474aefff801a)), closes [#INFR-9916](https://github.com/atinc/ngx-tethys/issues/INFR-9916)



## [16.1.4](https://github.com/atinc/ngx-tethys/compare/16.1.3...16.1.4) (2023-09-28)


### Bug Fixes

* **date-picker:**  adjust the order for  thyShortcutValueChange and ngModelChange #INFR-9734 ([#2843](https://github.com/atinc/ngx-tethys/issues/2843)) ([184ff32](https://github.com/atinc/ngx-tethys/commit/184ff329a1d494d6c05351fde0a20497343db803)), closes [#INFR-9734](https://github.com/atinc/ngx-tethys/issues/INFR-9734)
* **date-picker:** #INFR-9875 fix date-picker clear dispatch twice ([#2846](https://github.com/atinc/ngx-tethys/issues/2846)) ([a89c424](https://github.com/atinc/ngx-tethys/commit/a89c42458ff4bb8fac5c9a789006fb161807edc7))
* **property:** call setEditing when the thyEditable value changes #INFR-9869 ([#2845](https://github.com/atinc/ngx-tethys/issues/2845)) ([6373468](https://github.com/atinc/ngx-tethys/commit/637346885039621225fdb08698b25af562bb7cb4)), closes [#INFR-9869](https://github.com/atinc/ngx-tethys/issues/INFR-9869)



## [16.1.3](https://github.com/atinc/ngx-tethys/compare/16.1.2...16.1.3) (2023-09-21)


### Bug Fixes

* **datePicker:** thy-year-picker does not have a default time, when i… ([#2836](https://github.com/atinc/ngx-tethys/issues/2836)) ([367c436](https://github.com/atinc/ngx-tethys/commit/367c436728e762363b64e894ab2f31945b2992e4)), closes [#INFR-9345](https://github.com/atinc/ngx-tethys/issues/INFR-9345)
* **shared:** fix select control cursor error #INFR-9813 ([9cd8d84](https://github.com/atinc/ngx-tethys/commit/9cd8d84369dc67d654dcdda5f65508f63f303f23)), closes [#INFR-9813](https://github.com/atinc/ngx-tethys/issues/INFR-9813)


### Features

* **form:** auto focus first error element when form validate #INFR-8244 ([3803ee7](https://github.com/atinc/ngx-tethys/commit/3803ee7fc647028d789d4b5602fc1a91dedc11cc)), closes [#INFR-8244](https://github.com/atinc/ngx-tethys/issues/INFR-8244)
* **input-number:** #INFR-7140 restrict decimal places input  ([#2841](https://github.com/atinc/ngx-tethys/issues/2841)) ([561b916](https://github.com/atinc/ngx-tethys/commit/561b916362968d6b9609e68baeb4467ac23c008e)), closes [#INFR-7140](https://github.com/atinc/ngx-tethys/issues/INFR-7140)
* support focus(tabindex) for colorPicker, slider, rate, radio, checkbox and switch #INFR-9451 ([09c7f1e](https://github.com/atinc/ngx-tethys/commit/09c7f1ee253f85ca28224f04fd7019dcad01703f)), closes [#INFR-9451](https://github.com/atinc/ngx-tethys/issues/INFR-9451)



## [16.1.2](https://github.com/atinc/ngx-tethys/compare/16.1.1...16.1.2) (2023-09-05)


### Bug Fixes

* **image:** set default cursor when thyDisablePreview is true #INFR-9513 ([#2833](https://github.com/atinc/ngx-tethys/issues/2833)) ([77a1c02](https://github.com/atinc/ngx-tethys/commit/77a1c024e9e0ac8f3c345e71bf1f5607b2e8cdd0)), closes [#INFR-9513](https://github.com/atinc/ngx-tethys/issues/INFR-9513)


### Features

* **cdk:** rename useAction and useAsync to  actionBehavior and asyncBehavior #INFR-9544 ([#2834](https://github.com/atinc/ngx-tethys/issues/2834)) ([414f1a9](https://github.com/atinc/ngx-tethys/commit/414f1a918641153a33bab84dada6091a905b42a0)), closes [#INFR-9544](https://github.com/atinc/ngx-tethys/issues/INFR-9544)



## [16.1.1](https://github.com/atinc/ngx-tethys/compare/16.1.0-next.0...16.1.1) (2023-09-01)


### Features

* **cdk:** export some types for behaviors #INFR-9498 ([2c101d6](https://github.com/atinc/ngx-tethys/commit/2c101d639e47562a703a9ac70a935f8ff25bc286)), closes [#INFR-9498](https://github.com/atinc/ngx-tethys/issues/INFR-9498)
* **grid:** add thyFlex, thyFlexItem and thyGrid directives and refactor related components use hostDirectives #INFR-9461 ([d6b499b](https://github.com/atinc/ngx-tethys/commit/d6b499b9f00d6bcc9ae9acbebafc14fad9e6e997)), closes [#INFR-9461](https://github.com/atinc/ngx-tethys/issues/INFR-9461)



# [16.1.0](https://github.com/atinc/ngx-tethys/compare/16.1.0-next.0...16.1.0) (2023-08-31)



# [16.1.0-next.0](https://github.com/atinc/ngx-tethys/compare/16.0.5...16.1.0-next.0) (2023-08-30)


### Bug Fixes

* **styles:**  add d-contents ([#2812](https://github.com/atinc/ngx-tethys/issues/2812)) ([be8b632](https://github.com/atinc/ngx-tethys/commit/be8b6327238e5af9d8bf0c6e4b1d761e97b78f33))


### Features

* **cdk:** update behaviors to signal INFR-9396 ([#2822](https://github.com/atinc/ngx-tethys/issues/2822)) ([c3bea1e](https://github.com/atinc/ngx-tethys/commit/c3bea1efd280234c6de08d12999196123de41bc6))
* **dialog:** thy-dialog-body support cdkScrollable to make scroll strategy behave properly INFR-8826 ([#2820](https://github.com/atinc/ngx-tethys/issues/2820)) ([69b24b4](https://github.com/atinc/ngx-tethys/commit/69b24b473b0c0371cfebc1f946ed27fce9f69827))
* **dropdown:** thy-dropdown-menu thyWidth add default 240px and remove thyDropdown thyPopoverOptions width ([#2818](https://github.com/atinc/ngx-tethys/issues/2818)) ([d2eb0cc](https://github.com/atinc/ngx-tethys/commit/d2eb0ccb926b0c75b79f2fe9321de456526e2cc0)), closes [#INFR-9433](https://github.com/atinc/ngx-tethys/issues/INFR-9433)
* **grid:** add thyFlex and thyFlexItem #INFR-9429 ([#2821](https://github.com/atinc/ngx-tethys/issues/2821)) ([534f1a3](https://github.com/atinc/ngx-tethys/commit/534f1a3c657b67843521a5710e81ece72637580b)), closes [#INFR-9429](https://github.com/atinc/ngx-tethys/issues/INFR-9429)
* **layout:** sidebar support thyDragMinWidth INFR-3948 ([#2819](https://github.com/atinc/ngx-tethys/issues/2819)) ([91f1838](https://github.com/atinc/ngx-tethys/commit/91f1838b83a0231850242b4f0b4170073eba363f))



## [16.0.5](https://github.com/atinc/ngx-tethys/compare/16.0.4...16.0.5) (2023-08-29)


### Features

* #INFR-7478 Use 'not-allowed' for  disabled styling ([#2803](https://github.com/atinc/ngx-tethys/issues/2803)) ([88cb42f](https://github.com/atinc/ngx-tethys/commit/88cb42f620ec8575445910825cbf334e7e6bc9df)), closes [#INFR-7478](https://github.com/atinc/ngx-tethys/issues/INFR-7478) [#INFR-7478](https://github.com/atinc/ngx-tethys/issues/INFR-7478) [#INFR-7478](https://github.com/atinc/ngx-tethys/issues/INFR-7478)
* **tooltip:** better support for touch events,include popover,dropdown,colorpicker #INFR-9334 ([#2793](https://github.com/atinc/ngx-tethys/issues/2793)) ([2e52d46](https://github.com/atinc/ngx-tethys/commit/2e52d461de3b144b868d4f4fb590c83274891c74)), closes [#INFR-9334](https://github.com/atinc/ngx-tethys/issues/INFR-9334)



## [16.0.4](https://github.com/atinc/ngx-tethys/compare/16.0.3...16.0.4) (2023-08-25)


### Features

* **schematics:** add action-menu thyPlacement tips #INFR-9398 ([#2808](https://github.com/atinc/ngx-tethys/issues/2808)) ([7f45d88](https://github.com/atinc/ngx-tethys/commit/7f45d88298d0a22026f2e0aa49728012ffb89e32)), closes [#INFR-9398](https://github.com/atinc/ngx-tethys/issues/INFR-9398)



## [16.0.3](https://github.com/atinc/ngx-tethys/compare/16.0.1...16.0.3) (2023-08-25)


### Bug Fixes

* **schematics:** replace two input same start location #INFR-9268 ([#2801](https://github.com/atinc/ngx-tethys/issues/2801)) ([432ce20](https://github.com/atinc/ngx-tethys/commit/432ce20965affbbbf8fe17c8144d5073275277b6)), closes [#INFR-9268](https://github.com/atinc/ngx-tethys/issues/INFR-9268)


### Features

* **message:** message config add hostClass #INFR-9388 ([#2805](https://github.com/atinc/ngx-tethys/issues/2805)) ([324bd4d](https://github.com/atinc/ngx-tethys/commit/324bd4de0526736b1617323161ac2c1fa4078b10)), closes [#INFR-9388](https://github.com/atinc/ngx-tethys/issues/INFR-9388)
* **table:** replace loading with skeleton and make skeleton stronger #INFR-9201 ([#2799](https://github.com/atinc/ngx-tethys/issues/2799)) ([89d5cd5](https://github.com/atinc/ngx-tethys/commit/89d5cd505d40816df8f82532922a44786dbc12b5)), closes [#INFR-9201](https://github.com/atinc/ngx-tethys/issues/INFR-9201)



## [16.0.2](https://github.com/atinc/ngx-tethys/compare/16.0.1...16.0.2) (2023-08-24)


### Bug Fixes

* **schematics:** replace two input same start location #INFR-9268 ([#2801](https://github.com/atinc/ngx-tethys/issues/2801)) ([432ce20](https://github.com/atinc/ngx-tethys/commit/432ce20965affbbbf8fe17c8144d5073275277b6)), closes [#INFR-9268](https://github.com/atinc/ngx-tethys/issues/INFR-9268)



## [16.0.1](https://github.com/atinc/ngx-tethys/compare/16.0.0...16.0.1) (2023-08-24)


### Features

* **schematics:** update replace two input same start #INFR-9268 ([#2798](https://github.com/atinc/ngx-tethys/issues/2798)) ([bd4996e](https://github.com/atinc/ngx-tethys/commit/bd4996e2cff71585dfcd5a649dd29eac769e0f37)), closes [#INFR-9268](https://github.com/atinc/ngx-tethys/issues/INFR-9268)



# [16.0.0](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.4...16.0.0) (2023-08-24)


### Features

* **datePicker:** #INFR-9165 support thyMode dynamically switched ([#2770](https://github.com/atinc/ngx-tethys/issues/2770)) ([9b4d1b7](https://github.com/atinc/ngx-tethys/commit/9b4d1b78f92e5a7f88e32c5b03d085e93ba90bd8)), closes [#INFR-9165](https://github.com/atinc/ngx-tethys/issues/INFR-9165)
* **dropdown:** update thyImmediateRender template remove div #INFR-9359 ([#2794](https://github.com/atinc/ngx-tethys/issues/2794)) ([e7c6634](https://github.com/atinc/ngx-tethys/commit/e7c66344d83e80722113a9ae2d9ad336879ad5ab)), closes [#INFR-9359](https://github.com/atinc/ngx-tethys/issues/INFR-9359) [#INFR-9359](https://github.com/atinc/ngx-tethys/issues/INFR-9359)



# [16.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.3...16.0.0-next.4) (2023-08-23)


### Bug Fixes

* **schematics:** update action-menu crossing type replace ([a4973a1](https://github.com/atinc/ngx-tethys/commit/a4973a1a4641bcd974c367396f31b60530954f1c))


### Features

* **input:** manage input-search focus #INFR-8466, and adjust input-number focus monitor #INFR-8467 ([48330b6](https://github.com/atinc/ngx-tethys/commit/48330b657535518c6d603e31eb9002bda2405686)), closes [#INFR-8466](https://github.com/atinc/ngx-tethys/issues/INFR-8466) [#INFR-8467](https://github.com/atinc/ngx-tethys/issues/INFR-8467)
* **input:** thy-input-group support input count suffix for textarea INFR-9159 ([#2778](https://github.com/atinc/ngx-tethys/issues/2778)) ([597bf53](https://github.com/atinc/ngx-tethys/commit/597bf532426a94633588d7b6c5d49687ab578613))
* **tree:** refactoring tree drag and drop interaction #INFR-6918 ([#2790](https://github.com/atinc/ngx-tethys/issues/2790)) ([0919e79](https://github.com/atinc/ngx-tethys/commit/0919e79eaf2d265f72ce309ecd71a41770ee198a)), closes [#INFR-6918](https://github.com/atinc/ngx-tethys/issues/INFR-6918)



# [16.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.2...16.0.0-next.3) (2023-08-22)


### Bug Fixes

* **schematics:** style replace $action to $action-menu- ([e2f8f74](https://github.com/atinc/ngx-tethys/commit/e2f8f7458c43ef052f6b01ec0c3e5aeedaad0bb8))



## [15.3.20](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.0...15.3.20) (2023-08-15)


### Features

* **dropdown:** #INFR-8577 add thyImmediateRender at dropdown-menu ([#2768](https://github.com/atinc/ngx-tethys/issues/2768)) ([ce8aca3](https://github.com/atinc/ngx-tethys/commit/ce8aca35b48cde90e79cbcb7621758aab4db7009)), closes [#INFR-8577](https://github.com/atinc/ngx-tethys/issues/INFR-8577)
* **schematics:** add action-menu template/ts/stylesheets migration #INFR-7993 ([#2674](https://github.com/atinc/ngx-tethys/issues/2674)) ([d1d9263](https://github.com/atinc/ngx-tethys/commit/d1d92633ee860040b3e4bd843506bd3817c4c4c9)), closes [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993)



# [16.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.1...16.0.0-next.2) (2023-08-18)


### Features

* **schematics:** add scss variables replace and tips #INFR-9293 ([#2783](https://github.com/atinc/ngx-tethys/issues/2783)) ([b5d38b7](https://github.com/atinc/ngx-tethys/commit/b5d38b752427165d4bdb928c55a6e34b6e9d86da)), closes [#INFR-9293](https://github.com/atinc/ngx-tethys/issues/INFR-9293) [#INFR-9293](https://github.com/atinc/ngx-tethys/issues/INFR-9293) [#INFR-9293](https://github.com/atinc/ngx-tethys/issues/INFR-9293)
* **schematics:** update tips ([0bde94a](https://github.com/atinc/ngx-tethys/commit/0bde94a705dc23914de81e8dc194150e46c86712))



# [16.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/16.0.0-next.0...16.0.0-next.1) (2023-08-17)


### Bug Fixes

* **date-picker:** fix ci error for date picker #INFR-9273 ([#2781](https://github.com/atinc/ngx-tethys/issues/2781)) ([717ffbf](https://github.com/atinc/ngx-tethys/commit/717ffbfbd4adcf137f490307eb1ecd985dad0eaf)), closes [#INFR-9273](https://github.com/atinc/ngx-tethys/issues/INFR-9273)


### Features

* **schematics:** add tips ([#2777](https://github.com/atinc/ngx-tethys/issues/2777)) ([2c5de9f](https://github.com/atinc/ngx-tethys/commit/2c5de9f24f81ce4ea92502f80c77c4977bb9fb91))



# [16.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/15.3.16...16.0.0-next.0) (2023-08-15)


### Features

* **dropdown:** #INFR-8577 add thyImmediateRender at dropdown-menu ([#2768](https://github.com/atinc/ngx-tethys/issues/2768)) ([fd4fb28](https://github.com/atinc/ngx-tethys/commit/fd4fb289cd8487550143a17c0b2a9fb56fbb418d)), closes [#INFR-8577](https://github.com/atinc/ngx-tethys/issues/INFR-8577)
* **schematics:** add action-menu template/ts/stylesheets migration #INFR-7993 ([#2674](https://github.com/atinc/ngx-tethys/issues/2674)) ([a84a4f8](https://github.com/atinc/ngx-tethys/commit/a84a4f8213554c34a2dc8fe57f668563604e2fc0)), closes [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993)
* upgrade ng to 16 ([#2769](https://github.com/atinc/ngx-tethys/issues/2769)) ([6077e21](https://github.com/atinc/ngx-tethys/commit/6077e21f83e1c838069957f1be8f04e50da08f8a))


## [15.3.20](https://github.com/atinc/ngx-tethys/compare/15.3.16...15.3.20) (2023-08-15)


### Bug Fixes

* **calendar:** should show the default date in the correct format #INFR-7340 ([#2725](https://github.com/atinc/ngx-tethys/issues/2725)) ([0314160](https://github.com/atinc/ngx-tethys/commit/0314160709267cfe4fc965837084098cd56c1359)), closes [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340)
* **cascader:** fix checkbox style for cascader when thyMultiple is true #INFR-8481 ([#2733](https://github.com/atinc/ngx-tethys/issues/2733)) ([bfd74a7](https://github.com/atinc/ngx-tethys/commit/bfd74a7a9ef9ddaaa647fdf8bf8271893af09c10)), closes [#INFR-8481](https://github.com/atinc/ngx-tethys/issues/INFR-8481)
* **checkbox:** fix checked  input and label to 8px(#INFR-8972) ([#2763](https://github.com/atinc/ngx-tethys/issues/2763)) ([71023ce](https://github.com/atinc/ngx-tethys/commit/71023cef95966f594fe9977bfe24d27d3e803809)), closes [#INFR-8972](https://github.com/atinc/ngx-tethys/issues/INFR-8972) [#INFR-8972](https://github.com/atinc/ngx-tethys/issues/INFR-8972)
* **date-picker:** fix error when thyRangePicker shortcut presets #INFR-8584 ([#2747](https://github.com/atinc/ngx-tethys/issues/2747)) ([eef8e18](https://github.com/atinc/ngx-tethys/commit/eef8e1832cf1d58e0f1ad8f488fdc89a383477af)), closes [#INFR-8584](https://github.com/atinc/ngx-tethys/issues/INFR-8584)
* **date-picker:** should get the correct presets value when time passes #INFR-8552 ([#2748](https://github.com/atinc/ngx-tethys/issues/2748)) ([f5e909b](https://github.com/atinc/ngx-tethys/commit/f5e909bae217e222113f8f94bbdcd574fcb5d5de)), closes [#INFR-8552](https://github.com/atinc/ngx-tethys/issues/INFR-8552)
* **date-range:** the previous date range and the next date range should be connectable when unit of step is month #INFR-2425 ([#2723](https://github.com/atinc/ngx-tethys/issues/2723)) ([332e2c4](https://github.com/atinc/ngx-tethys/commit/332e2c464ecbca47e999bc6a24902bda81cb99fc)), closes [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425)
* **icon:** click icon (svg) to change source position of tooltip, but tooltip is not closed when tooltip is bound to the component or native tag containing thy-icon INFR-8660 ([#2754](https://github.com/atinc/ngx-tethys/issues/2754)) ([0d3563d](https://github.com/atinc/ngx-tethys/commit/0d3563d2ab37d909516c5f7eb96f1a6dad492d95))
* **property:** remove pointer when hover in property name #INFR-8807 ([#2760](https://github.com/atinc/ngx-tethys/issues/2760)) ([d5178b1](https://github.com/atinc/ngx-tethys/commit/d5178b1c1bd8d569a15eb9cd83b90e50e2acd2d3)), closes [#INFR-8807](https://github.com/atinc/ngx-tethys/issues/INFR-8807)
* **switch:**  add xs size for switch #INFR-8616 ([#2750](https://github.com/atinc/ngx-tethys/issues/2750)) ([bf50683](https://github.com/atinc/ngx-tethys/commit/bf50683db52d0bff930e8e526e5df8d49a860f28)), closes [#INFR-8616](https://github.com/atinc/ngx-tethys/issues/INFR-8616)
* **tooltip:** fix tooltip's show-hide behavior when container scrolled #INFR-3715 ([cd34ce2](https://github.com/atinc/ngx-tethys/commit/cd34ce2e38b769e7c9c6935ad252792fe9092fcc)), closes [#INFR-3715](https://github.com/atinc/ngx-tethys/issues/INFR-3715)
* **tree-select:** replace wtf-checked with thy-icon named check for tree-select and select component #INFR-5942 ([#2749](https://github.com/atinc/ngx-tethys/issues/2749)) ([ef509ff](https://github.com/atinc/ngx-tethys/commit/ef509ffb9b0d9784ac2acaba95741429e90116e5)), closes [#INFR-5942](https://github.com/atinc/ngx-tethys/issues/INFR-5942)


### Features

* **color-picker:**  color-picker support disabled (#INFR-8645) ([#2757](https://github.com/atinc/ngx-tethys/issues/2757)) ([2d8617f](https://github.com/atinc/ngx-tethys/commit/2d8617f228d28c756d44238046337f1e6c41131d)), closes [#INFR-8645](https://github.com/atinc/ngx-tethys/issues/INFR-8645)
* **color-picker:** add popoverRef param when panel open and close #INFR-8673 ([#2756](https://github.com/atinc/ngx-tethys/issues/2756)) ([964a748](https://github.com/atinc/ngx-tethys/commit/964a748016f8ca8d59b229df8a9a81252f4b32b1)), closes [#INFR-8673](https://github.com/atinc/ngx-tethys/issues/INFR-8673)
* **copy:** #INFR-8738  replace TooltipService with ThyTooltipService in thy-copy ([1cbd043](https://github.com/atinc/ngx-tethys/commit/1cbd043852367ff0602fe3c263e1d19e01a147c2)), closes [#INFR-8738](https://github.com/atinc/ngx-tethys/issues/INFR-8738)
* **dropdown:** #INFR-8577 add thyImmediateRender at dropdown-menu ([#2768](https://github.com/atinc/ngx-tethys/issues/2768)) ([ce8aca3](https://github.com/atinc/ngx-tethys/commit/ce8aca35b48cde90e79cbcb7621758aab4db7009)), closes [#INFR-8577](https://github.com/atinc/ngx-tethys/issues/INFR-8577)
* **flexibleText:** #INFR-7980  replace TooltipService with ThyTooltipService in thy-flexible-text ([#2742](https://github.com/atinc/ngx-tethys/issues/2742)) ([c758c63](https://github.com/atinc/ngx-tethys/commit/c758c630969f050c7ae140def4a402cb11a6b480)), closes [#INFR-7980](https://github.com/atinc/ngx-tethys/issues/INFR-7980)
* **layout:** merge thyHasBorderLeft and thyHasBorderRight into thyDivided, implement the divider on the left or right according to thyDirection #INFR-8536 ([#2755](https://github.com/atinc/ngx-tethys/issues/2755)) ([fac034f](https://github.com/atinc/ngx-tethys/commit/fac034f14e61c5be32cf58457240b89391978498)), closes [#INFR-8536](https://github.com/atinc/ngx-tethys/issues/INFR-8536)
* **nav:** support thyInsideClosable for more popover #INFR-8551 ([#2746](https://github.com/atinc/ngx-tethys/issues/2746)) ([b4f6f56](https://github.com/atinc/ngx-tethys/commit/b4f6f56c64af3a30563e1193467cffbc847d83c2)), closes [#INFR-8551](https://github.com/atinc/ngx-tethys/issues/INFR-8551)
* **overlay:** add thyPortalOutlet & use thyPortalOutlet in autocompl… ([#2752](https://github.com/atinc/ngx-tethys/issues/2752)) ([695217b](https://github.com/atinc/ngx-tethys/commit/695217b023e61d8bed4e9384d741994fc0cd703a))
* **schematics:** add action-menu template/ts/stylesheets migration #INFR-7993 ([#2674](https://github.com/atinc/ngx-tethys/issues/2674)) ([d1d9263](https://github.com/atinc/ngx-tethys/commit/d1d92633ee860040b3e4bd843506bd3817c4c4c9)), closes [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993)
* **schematics:** add cdk migration and v16 label template/ts/stylesheets migration  ([#2759](https://github.com/atinc/ngx-tethys/issues/2759)) ([e87f75d](https://github.com/atinc/ngx-tethys/commit/e87f75d9db68f8ec6bb9f120af4a1663a5a8f35c)), closes [#INFR-7913](https://github.com/atinc/ngx-tethys/issues/INFR-7913) [#INFR-7913](https://github.com/atinc/ngx-tethys/issues/INFR-7913) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993)
* **select:** #INFR-9135 add thyBorderless at custom-select ([#2767](https://github.com/atinc/ngx-tethys/issues/2767)) ([7000e7b](https://github.com/atinc/ngx-tethys/commit/7000e7bb65b10db99faab9b05539dbaef7ed00fe)), closes [#INFR-9135](https://github.com/atinc/ngx-tethys/issues/INFR-9135) [#INFR-9135](https://github.com/atinc/ngx-tethys/issues/INFR-9135)
* **tooltip:**  remove TooltipService completely (#INFR-7979) ([#2765](https://github.com/atinc/ngx-tethys/issues/2765)) ([d9bf172](https://github.com/atinc/ngx-tethys/commit/d9bf17258d8b0768af3c2d5ca2f94d3e6b991654)), closes [#INFR-7979](https://github.com/atinc/ngx-tethys/issues/INFR-7979) [#INFR-7979](https://github.com/atinc/ngx-tethys/issues/INFR-7979)


## [15.3.19](https://github.com/atinc/ngx-tethys/compare/15.3.16...15.3.19) (2023-07-26)


### Bug Fixes

* **icon:** click icon (svg) to change source position of tooltip, but tooltip is not closed when tooltip is bound to the component or native tag containing thy-icon INFR-8660 ([#2754](https://github.com/atinc/ngx-tethys/issues/2754)) ([0d3563d](https://github.com/atinc/ngx-tethys/commit/0d3563d2ab37d909516c5f7eb96f1a6dad492d95))
* **property:** remove pointer when hover in property name #INFR-8807 ([#2760](https://github.com/atinc/ngx-tethys/issues/2760)) ([d5178b1](https://github.com/atinc/ngx-tethys/commit/d5178b1c1bd8d569a15eb9cd83b90e50e2acd2d3)), closes [#INFR-8807](https://github.com/atinc/ngx-tethys/issues/INFR-8807)


### Features

* **layout:** merge thyHasBorderLeft and thyHasBorderRight into thyDivided, implement the divider on the left or right according to thyDirection #INFR-8536 ([#2755](https://github.com/atinc/ngx-tethys/issues/2755)) ([fac034f](https://github.com/atinc/ngx-tethys/commit/fac034f14e61c5be32cf58457240b89391978498)), closes [#INFR-8536](https://github.com/atinc/ngx-tethys/issues/INFR-8536)
* **overlay:** add thyPortalOutlet & use thyPortalOutlet in autocompl… ([#2752](https://github.com/atinc/ngx-tethys/issues/2752)) ([695217b](https://github.com/atinc/ngx-tethys/commit/695217b023e61d8bed4e9384d741994fc0cd703a))
* **schematics:** add cdk migration and v16 label template/ts/stylesheets migration  ([#2759](https://github.com/atinc/ngx-tethys/issues/2759)) ([e87f75d](https://github.com/atinc/ngx-tethys/commit/e87f75d9db68f8ec6bb9f120af4a1663a5a8f35c)), closes [#INFR-7913](https://github.com/atinc/ngx-tethys/issues/INFR-7913) [#INFR-7913](https://github.com/atinc/ngx-tethys/issues/INFR-7913) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993) [#INFR-7993](https://github.com/atinc/ngx-tethys/issues/INFR-7993)



## [15.3.18](https://github.com/atinc/ngx-tethys/compare/15.3.16...15.3.18) (2023-07-14)


### Bug Fixes

* **calendar:** should show the default date in the correct format #INFR-7340 ([#2725](https://github.com/atinc/ngx-tethys/issues/2725)) ([0314160](https://github.com/atinc/ngx-tethys/commit/0314160709267cfe4fc965837084098cd56c1359)), closes [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340) [#INFR-7340](https://github.com/atinc/ngx-tethys/issues/INFR-7340)
* **date-range:** the previous date range and the next date range should be connectable when unit of step is month #INFR-2425 ([#2723](https://github.com/atinc/ngx-tethys/issues/2723)) ([332e2c4](https://github.com/atinc/ngx-tethys/commit/332e2c464ecbca47e999bc6a24902bda81cb99fc)), closes [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425) [#INFR-2425](https://github.com/atinc/ngx-tethys/issues/INFR-2425)
* **tree-select:** replace wtf-checked with thy-icon named check for tree-select and select component #INFR-5942 ([#2749](https://github.com/atinc/ngx-tethys/issues/2749)) ([ef509ff](https://github.com/atinc/ngx-tethys/commit/ef509ffb9b0d9784ac2acaba95741429e90116e5)), closes [#INFR-5942](https://github.com/atinc/ngx-tethys/issues/INFR-5942)


### Features

* **color-picker:** color-picker support disabled (#INFR-8645) ([#2757](https://github.com/atinc/ngx-tethys/issues/2757)) ([2d8617f](https://github.com/atinc/ngx-tethys/commit/2d8617f228d28c756d44238046337f1e6c41131d)), closes [#INFR-8645](https://github.com/atinc/ngx-tethys/issues/INFR-8645)
* **color-picker:** add popoverRef param when panel open and close #INFR-8673 ([#2756](https://github.com/atinc/ngx-tethys/issues/2756)) ([964a748](https://github.com/atinc/ngx-tethys/commit/964a748016f8ca8d59b229df8a9a81252f4b32b1)), closes [#INFR-8673](https://github.com/atinc/ngx-tethys/issues/INFR-8673)


## [15.3.17](https://github.com/atinc/ngx-tethys/compare/15.3.16...15.3.17) (2023-07-05)


### Bug Fixes

* **cascader:** fix checkbox style for cascader when thyMultiple is true #INFR-8481 ([#2733](https://github.com/atinc/ngx-tethys/issues/2733)) ([bfd74a7](https://github.com/atinc/ngx-tethys/commit/bfd74a7a9ef9ddaaa647fdf8bf8271893af09c10)), closes [#INFR-8481](https://github.com/atinc/ngx-tethys/issues/INFR-8481)
* **date-picker:** fix error when thyRangePicker shortcut presets #INFR-8584 ([#2747](https://github.com/atinc/ngx-tethys/issues/2747)) ([eef8e18](https://github.com/atinc/ngx-tethys/commit/eef8e1832cf1d58e0f1ad8f488fdc89a383477af)), closes [#INFR-8584](https://github.com/atinc/ngx-tethys/issues/INFR-8584)
* **date-picker:** should get the correct presets value when time passes #INFR-8552 ([#2748](https://github.com/atinc/ngx-tethys/issues/2748)) ([f5e909b](https://github.com/atinc/ngx-tethys/commit/f5e909bae217e222113f8f94bbdcd574fcb5d5de)), closes [#INFR-8552](https://github.com/atinc/ngx-tethys/issues/INFR-8552)
* **switch:**  thySize support xs and adjust $switch-xs-width from 24px to 28px #INFR-8616 ([#2750](https://github.com/atinc/ngx-tethys/issues/2750)) ([bf50683](https://github.com/atinc/ngx-tethys/commit/bf50683db52d0bff930e8e526e5df8d49a860f28)), closes [#INFR-8616](https://github.com/atinc/ngx-tethys/issues/INFR-8616)
* **tooltip:** fix tooltip's show-hide behavior when container scrolled #INFR-3715 ([cd34ce2](https://github.com/atinc/ngx-tethys/commit/cd34ce2e38b769e7c9c6935ad252792fe9092fcc)), closes [#INFR-3715](https://github.com/atinc/ngx-tethys/issues/INFR-3715)


### Features

* **nav:** support thyInsideClosable for more popover #INFR-8551 ([#2746](https://github.com/atinc/ngx-tethys/issues/2746)) ([b4f6f56](https://github.com/atinc/ngx-tethys/commit/b4f6f56c64af3a30563e1193467cffbc847d83c2)), closes [#INFR-8551](https://github.com/atinc/ngx-tethys/issues/INFR-8551)



## [15.3.16](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.16) (2023-06-27)

### Bug Fixes

* **input:** adjust disabled style #INFR-8496# ([#2738](https://github.com/atinc/ngx-tethys/issues/2738)) ([6d84348](https://github.com/atinc/ngx-tethys/commit/6d84348d2aeda3d6005527b7ce4e1e14ee383073)), closes [#INFR-8496](https://github.com/atinc/ngx-tethys/issues/INFR-8496)


## [15.3.15](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.15) (2023-06-27)


### Bug Fixes

* **tree-select:** #INFR-5075 fix the issue of calling changeSelectValue twice to remove selected items ([#2732](https://github.com/atinc/ngx-tethys/issues/2732)) ([02f9923](https://github.com/atinc/ngx-tethys/commit/02f9923c6631112a06627bccfe0b1ea76bcb5221))


## [15.3.13](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.13) (2023-06-26)


### Bug Fixes

* **action:** not display bg color when hover lite action #INFR-8446 ([#2717](https://github.com/atinc/ngx-tethys/issues/2717)) ([b8a624b](https://github.com/atinc/ngx-tethys/commit/b8a624be9eea180215f696089e7aa89d94c890cc)), closes [#INFR-8446](https://github.com/atinc/ngx-tethys/issues/INFR-8446)
* **avatar:** add constant of avatar list item space INFR-8056  ([9b96f4c](https://github.com/atinc/ngx-tethys/commit/9b96f4ca6b5f8d87a903da554aa20d6c4dfa3d6b))
* **avatar:** set the z-index of avatar items in reverse order in thy-avatar-list #INFR-8233 ([#2709](https://github.com/atinc/ngx-tethys/issues/2709)) ([8c53705](https://github.com/atinc/ngx-tethys/commit/8c537055587f637f864ccae52df2b0bf67736fd1)), closes [#INFR-8233](https://github.com/atinc/ngx-tethys/issues/INFR-8233)
* **avatar:** the overlap space of thy-avatar-list component in overlap mode is 25% of the width of avatar component #INFR-8056 ([b26ad14](https://github.com/atinc/ngx-tethys/commit/b26ad1418bf4a0548889c76ea3c17bf6f29729c1)), closes [#INFR-8056](https://github.com/atinc/ngx-tethys/issues/INFR-8056)
* **cascader:** empty width fit trigger width #INFR-8163 ([#2694](https://github.com/atinc/ngx-tethys/issues/2694)) ([5df97ff](https://github.com/atinc/ngx-tethys/commit/5df97ff976c5b75e5e96f7a66977d0ded9b9e73c)), closes [#INFR-8163](https://github.com/atinc/ngx-tethys/issues/INFR-8163)
* **cascader:** fix it is still open when in disabled state #INFR-8141 ([#2692](https://github.com/atinc/ngx-tethys/issues/2692)) ([a73da1b](https://github.com/atinc/ngx-tethys/commit/a73da1bef1d4a75f7989f24b9f39e0910f5009fe)), closes [#INFR-8141](https://github.com/atinc/ngx-tethys/issues/INFR-8141)
* **date-picker:** #INFR-8051 default shortcut ranges presets end of week err ([#2689](https://github.com/atinc/ngx-tethys/issues/2689)) ([3924571](https://github.com/atinc/ngx-tethys/commit/3924571750ed238c49a26beff815ef9dc40b6552)), closes [#INFR-8051](https://github.com/atinc/ngx-tethys/issues/INFR-8051)
* **date-picker:** #INFR-8069 shortcut support thyMinDate thyMaxDate ([#2691](https://github.com/atinc/ngx-tethys/issues/2691)) ([7f72682](https://github.com/atinc/ngx-tethys/commit/7f7268215f585c4c39d55ef50ecb66ce304ff67e)), closes [#INFR-8069](https://github.com/atinc/ngx-tethys/issues/INFR-8069)
* **date-picker:** fix both clear icon and calendar icon are displayed #INFR-8182 ([#2696](https://github.com/atinc/ngx-tethys/issues/2696)) ([f1914d3](https://github.com/atinc/ngx-tethys/commit/f1914d3a7900b4e836c2a1eb3cd7a059f3c2f40f)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **date-picker:** fix calendar icon hover style #INFR-8182 ([#2702](https://github.com/atinc/ngx-tethys/issues/2702)) ([94e3013](https://github.com/atinc/ngx-tethys/commit/94e3013120d4d15c4006d023d99f1d9b14179135)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **date-range:** fix the icon is not centered horizontally by replacing thy-icon-nav with thyAction #INFR-8245 ([#2724](https://github.com/atinc/ngx-tethys/issues/2724)) ([1fbcd38](https://github.com/atinc/ngx-tethys/commit/1fbcd382bdedb977871936c1629a62ed99c2463d)), closes [#INFR-8245](https://github.com/atinc/ngx-tethys/issues/INFR-8245)
* **datepicker:** fix error for shortcut  when get date value according to min and max date #INFR-8250 ([#2715](https://github.com/atinc/ngx-tethys/issues/2715)) ([1432f58](https://github.com/atinc/ngx-tethys/commit/1432f5891bf85c062c230fd92d843dbb6e04000a)), closes [#INFR-8250](https://github.com/atinc/ngx-tethys/issues/INFR-8250)
* **datepicker:** should disable shortcut item whose preset is out of thyMinDate ~ thyMaxDate #INFR-8412 ([#2716](https://github.com/atinc/ngx-tethys/issues/2716)) ([2964b54](https://github.com/atinc/ngx-tethys/commit/2964b548289faf44b2eae54c512d629708afaa14)), closes [#INFR-8412](https://github.com/atinc/ngx-tethys/issues/INFR-8412)
* **datepicker:** should forbidden to click the ok button of time when the selected date value does not meet the constraints of thyMinDate or thyMaxDate #INFR-8396 ([#2714](https://github.com/atinc/ngx-tethys/issues/2714)) ([cf37ee9](https://github.com/atinc/ngx-tethys/commit/cf37ee90fbda99380adcdc4634cc1db9a2c6f689)), closes [#INFR-8396](https://github.com/atinc/ngx-tethys/issues/INFR-8396)
* **form:** fix defaultRemoveError removeChild error #INFR-8240 ([c856d80](https://github.com/atinc/ngx-tethys/commit/c856d80c2633f2af4fb710e3254b536d79caf6f8)), closes [#INFR-8240](https://github.com/atinc/ngx-tethys/issues/INFR-8240)
* **input-search:** fix clear icon style when position of search icon is before and searchText has value #INFR-7538 ([#2726](https://github.com/atinc/ngx-tethys/issues/2726)) ([0f8919d](https://github.com/atinc/ngx-tethys/commit/0f8919d679410e3697445da4fd2eeef5a0eeb5df)), closes [#INFR-7538](https://github.com/atinc/ngx-tethys/issues/INFR-7538) [#INFR-7538](https://github.com/atinc/ngx-tethys/issues/INFR-7538) [#INFR-7538](https://github.com/atinc/ngx-tethys/issues/INFR-7538)
* **input:** add disable style for input-search #INFR-8496 ([#2735](https://github.com/atinc/ngx-tethys/issues/2735)) ([4542d19](https://github.com/atinc/ngx-tethys/commit/4542d194ab24a5bf9513d6bd694f2be7dde92228)), closes [#INFR-8496](https://github.com/atinc/ngx-tethys/issues/INFR-8496)
* **menu:** delete parent in menu group #INFR-8400 ([#2711](https://github.com/atinc/ngx-tethys/issues/2711)) ([fa663b2](https://github.com/atinc/ngx-tethys/commit/fa663b2ebb2bf0da1d6e13dc468a92d2b2172b6a)), closes [#INFR-8400](https://github.com/atinc/ngx-tethys/issues/INFR-8400)
* **property:** should complete eventDestroy$ when component destroy ([#2703](https://github.com/atinc/ngx-tethys/issues/2703)) ([b3fe97c](https://github.com/atinc/ngx-tethys/commit/b3fe97c66d84113e47dd0db2d8fe0ec2c0a0cc00))
* **property:** should destroy the subscription of click event when the value of thyEditable is changed from true to false #INFR-8179 ([#2701](https://github.com/atinc/ngx-tethys/issues/2701)) ([ac9ba57](https://github.com/atinc/ngx-tethys/commit/ac9ba5761bc068b3359b58c76fc57937610d25c6)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)
* **property:** should not subscribe multiple times when the value of thyEditable is changed to true #INFR-8179 ([#2695](https://github.com/atinc/ngx-tethys/issues/2695)) ([34e600c](https://github.com/atinc/ngx-tethys/commit/34e600c579fd978b8f93cca26c52cc4e417c249c)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)
* **table:** thyTheme值为bordered且可拖拽时，拖拽图标和文字之间的间距过大 #INFR-8217 ([#2705](https://github.com/atinc/ngx-tethys/issues/2705)) ([f2ac471](https://github.com/atinc/ngx-tethys/commit/f2ac471cb2e92d4297e5f03308eb828b741a47db)), closes [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217)


### Features

* **action:** supports  success and error feedback  #INFR-8234 ([#2706](https://github.com/atinc/ngx-tethys/issues/2706)) ([62edb36](https://github.com/atinc/ngx-tethys/commit/62edb3633e73032d2ce378a87bf45fe3abd88842)), closes [#INFR-8234](https://github.com/atinc/ngx-tethys/issues/INFR-8234)
* **layout:** sidebar component support position right #INFR-8411 ([#2721](https://github.com/atinc/ngx-tethys/issues/2721)) ([c50b649](https://github.com/atinc/ngx-tethys/commit/c50b6497586d051497301c25e0d8096ec7e5a4d6)), closes [#INFR-8411](https://github.com/atinc/ngx-tethys/issues/INFR-8411) [#INFR-8411](https://github.com/atinc/ngx-tethys/issues/INFR-8411)
* **segment:** support change selected value by manually #INFR-6892 [@wumeimin](https://github.com/wumeimin) [@luxiaobei](https://github.com/luxiaobei) (#INFR-6892) ([#2718](https://github.com/atinc/ngx-tethys/issues/2718)) ([3c24b3b](https://github.com/atinc/ngx-tethys/commit/3c24b3b921074ca7d60d0bdcadfb7aeb645e4750)), closes [#INFR-6892](https://github.com/atinc/ngx-tethys/issues/INFR-6892) [#INFR-6892](https://github.com/atinc/ngx-tethys/issues/INFR-6892)
* **select:** support global setting placement in THY_SELECT_CONFIG and add placement examples #INFR-8025 ([#2688](https://github.com/atinc/ngx-tethys/issues/2688)) ([479fa01](https://github.com/atinc/ngx-tethys/commit/479fa01a1b256fb2d32c64cce61730017f7c4c29)), closes [#INFR-8025](https://github.com/atinc/ngx-tethys/issues/INFR-8025)
* **tree:** support expend children nodes when doubble click tree nod… ([#2719](https://github.com/atinc/ngx-tethys/issues/2719)) ([1bfd1a6](https://github.com/atinc/ngx-tethys/commit/1bfd1a676d8371be5096b90c444171c816482225))



## [15.3.12](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.12) (2023-06-21)

### Features

* **layout:** sidebar component support position right #INFR-8411 ([#2721](https://github.com/atinc/ngx-tethys/issues/2721)) ([c50b649](https://github.com/atinc/ngx-tethys/commit/c50b6497586d051497301c25e0d8096ec7e5a4d6)), closes [#INFR-8411](https://github.com/atinc/ngx-tethys/issues/INFR-8411) [#INFR-8411](https://github.com/atinc/ngx-tethys/issues/INFR-8411)



## [15.3.11](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.11) (2023-06-21)


### Bug Fixes

* **action:** not display bg color when hover lite action #INFR-8446 ([#2717](https://github.com/atinc/ngx-tethys/issues/2717)) ([b8a624b](https://github.com/atinc/ngx-tethys/commit/b8a624be9eea180215f696089e7aa89d94c890cc)), closes [#INFR-8446](https://github.com/atinc/ngx-tethys/issues/INFR-8446)
* **cascader:** empty width fit trigger width #INFR-8163 ([#2694](https://github.com/atinc/ngx-tethys/issues/2694)) ([5df97ff](https://github.com/atinc/ngx-tethys/commit/5df97ff976c5b75e5e96f7a66977d0ded9b9e73c)), closes [#INFR-8163](https://github.com/atinc/ngx-tethys/issues/INFR-8163)
* **datepicker:** fix error for shortcut when get date value according to min and max date #INFR-8250 ([#2715](https://github.com/atinc/ngx-tethys/issues/2715)) ([1432f58](https://github.com/atinc/ngx-tethys/commit/1432f5891bf85c062c230fd92d843dbb6e04000a)), closes [#INFR-8250](https://github.com/atinc/ngx-tethys/issues/INFR-8250)
* **datepicker:** should disable shortcut item whose preset is out of thyMinDate ~ thyMaxDate #INFR-8412 ([#2716](https://github.com/atinc/ngx-tethys/issues/2716)) ([2964b54](https://github.com/atinc/ngx-tethys/commit/2964b548289faf44b2eae54c512d629708afaa14)), closes [#INFR-8412](https://github.com/atinc/ngx-tethys/issues/INFR-8412)
* **datepicker:** should forbidden to click the ok button of time when the selected date value does not meet the constraints of thyMinDate or thyMaxDate #INFR-8396 ([#2714](https://github.com/atinc/ngx-tethys/issues/2714)) ([cf37ee9](https://github.com/atinc/ngx-tethys/commit/cf37ee90fbda99380adcdc4634cc1db9a2c6f689)), closes [#INFR-8396](https://github.com/atinc/ngx-tethys/issues/INFR-8396)
* **menu:** delete parent in menu group #INFR-8400 ([#2711](https://github.com/atinc/ngx-tethys/issues/2711)) ([fa663b2](https://github.com/atinc/ngx-tethys/commit/fa663b2ebb2bf0da1d6e13dc468a92d2b2172b6a)), closes [#INFR-8400](https://github.com/atinc/ngx-tethys/issues/INFR-8400)


### Features

* **segment:** support change selected value by manually #INFR-6892 [@wumeimin](https://github.com/wumeimin) [@luxiaobei](https://github.com/luxiaobei) (#INFR-6892) ([#2718](https://github.com/atinc/ngx-tethys/issues/2718)) ([3c24b3b](https://github.com/atinc/ngx-tethys/commit/3c24b3b921074ca7d60d0bdcadfb7aeb645e4750)), closes [#INFR-6892](https://github.com/atinc/ngx-tethys/issues/INFR-6892) [#INFR-6892](https://github.com/atinc/ngx-tethys/issues/INFR-6892)
* **tree:** support expand children nodes when doubble click tree nod… ([#2719](https://github.com/atinc/ngx-tethys/issues/2719)) ([1bfd1a6](https://github.com/atinc/ngx-tethys/commit/1bfd1a676d8371be5096b90c444171c816482225))



## [15.3.10](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.10) (2023-06-15)


### Bug Fixes

* **avatar:** add constant of avatar list item space INFR-8056  ([9b96f4c](https://github.com/atinc/ngx-tethys/commit/9b96f4ca6b5f8d87a903da554aa20d6c4dfa3d6b))
* **avatar:** set the z-index of avatar items in reverse order in thy-avatar-list #INFR-8233 ([#2709](https://github.com/atinc/ngx-tethys/issues/2709)) ([8c53705](https://github.com/atinc/ngx-tethys/commit/8c537055587f637f864ccae52df2b0bf67736fd1)), closes [#INFR-8233](https://github.com/atinc/ngx-tethys/issues/INFR-8233)
* **avatar:** the overlap space of thy-avatar-list component in overlap mode is 25% of the width of avatar component #INFR-8056 ([b26ad14](https://github.com/atinc/ngx-tethys/commit/b26ad1418bf4a0548889c76ea3c17bf6f29729c1)), closes [#INFR-8056](https://github.com/atinc/ngx-tethys/issues/INFR-8056)
* **cascader:** fix it is still open when in disabled state #INFR-8141 ([#2692](https://github.com/atinc/ngx-tethys/issues/2692)) ([a73da1b](https://github.com/atinc/ngx-tethys/commit/a73da1bef1d4a75f7989f24b9f39e0910f5009fe)), closes [#INFR-8141](https://github.com/atinc/ngx-tethys/issues/INFR-8141)
* **date-picker:** #INFR-8051 default shortcut ranges presets end of week err ([#2689](https://github.com/atinc/ngx-tethys/issues/2689)) ([3924571](https://github.com/atinc/ngx-tethys/commit/3924571750ed238c49a26beff815ef9dc40b6552)), closes [#INFR-8051](https://github.com/atinc/ngx-tethys/issues/INFR-8051)
* **date-picker:** #INFR-8069 shortcut support thyMinDate thyMaxDate ([#2691](https://github.com/atinc/ngx-tethys/issues/2691)) ([7f72682](https://github.com/atinc/ngx-tethys/commit/7f7268215f585c4c39d55ef50ecb66ce304ff67e)), closes [#INFR-8069](https://github.com/atinc/ngx-tethys/issues/INFR-8069)
* **date-picker:** fix both clear icon and calendar icon are displayed #INFR-8182 ([#2696](https://github.com/atinc/ngx-tethys/issues/2696)) ([f1914d3](https://github.com/atinc/ngx-tethys/commit/f1914d3a7900b4e836c2a1eb3cd7a059f3c2f40f)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **date-picker:** fix calendar icon hover style #INFR-8182 ([#2702](https://github.com/atinc/ngx-tethys/issues/2702)) ([94e3013](https://github.com/atinc/ngx-tethys/commit/94e3013120d4d15c4006d023d99f1d9b14179135)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **form:** fix defaultRemoveError removeChild error #INFR-8240 ([c856d80](https://github.com/atinc/ngx-tethys/commit/c856d80c2633f2af4fb710e3254b536d79caf6f8)), closes [#INFR-8240](https://github.com/atinc/ngx-tethys/issues/INFR-8240)
* **property:** should complete eventDestroy$ when component destroy ([#2703](https://github.com/atinc/ngx-tethys/issues/2703)) ([b3fe97c](https://github.com/atinc/ngx-tethys/commit/b3fe97c66d84113e47dd0db2d8fe0ec2c0a0cc00))
* **property:** should destroy the subscription of click event when the value of thyEditable is changed from true to false #INFR-8179 ([#2701](https://github.com/atinc/ngx-tethys/issues/2701)) ([ac9ba57](https://github.com/atinc/ngx-tethys/commit/ac9ba5761bc068b3359b58c76fc57937610d25c6)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)
* **property:** should not subscribe multiple times when the value of thyEditable is changed to true #INFR-8179 ([#2695](https://github.com/atinc/ngx-tethys/issues/2695)) ([34e600c](https://github.com/atinc/ngx-tethys/commit/34e600c579fd978b8f93cca26c52cc4e417c249c)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)
* **table:** thyTheme值为bordered且可拖拽时，拖拽图标和文字之间的间距过大 #INFR-8217 ([#2705](https://github.com/atinc/ngx-tethys/issues/2705)) ([f2ac471](https://github.com/atinc/ngx-tethys/commit/f2ac471cb2e92d4297e5f03308eb828b741a47db)), closes [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217)


### Features

* **action:** supports  success and error feedback  #INFR-8234 ([#2706](https://github.com/atinc/ngx-tethys/issues/2706)) ([62edb36](https://github.com/atinc/ngx-tethys/commit/62edb3633e73032d2ce378a87bf45fe3abd88842)), closes [#INFR-8234](https://github.com/atinc/ngx-tethys/issues/INFR-8234)
* **select:** support global setting placement in THY_SELECT_CONFIG and add placement examples #INFR-8025 ([#2688](https://github.com/atinc/ngx-tethys/issues/2688)) ([479fa01](https://github.com/atinc/ngx-tethys/commit/479fa01a1b256fb2d32c64cce61730017f7c4c29)), closes [#INFR-8025](https://github.com/atinc/ngx-tethys/issues/INFR-8025)



## [15.3.9](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.9) (2023-06-08)


### Bug Fixes

* **form:** fix defaultRemoveError removeChild error #INFR-8240 ([c856d80](https://github.com/atinc/ngx-tethys/commit/c856d80c2633f2af4fb710e3254b536d79caf6f8)), closes [#INFR-8240](https://github.com/atinc/ngx-tethys/issues/INFR-8240)
* **table:** thyTheme值为bordered且可拖拽时，拖拽图标和文字之间的间距过大 #INFR-8217 ([#2705](https://github.com/atinc/ngx-tethys/issues/2705)) ([f2ac471](https://github.com/atinc/ngx-tethys/commit/f2ac471cb2e92d4297e5f03308eb828b741a47db)), closes [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217) [#INFR-8217](https://github.com/atinc/ngx-tethys/issues/INFR-8217)


### Features

* **action:** supports  success and error feedback  #INFR-8234 ([#2706](https://github.com/atinc/ngx-tethys/issues/2706)) ([62edb36](https://github.com/atinc/ngx-tethys/commit/62edb3633e73032d2ce378a87bf45fe3abd88842)), closes [#INFR-8234](https://github.com/atinc/ngx-tethys/issues/INFR-8234)



## [15.3.8](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.8) (2023-06-06)


### Bug Fixes
* **date-picker:** fix calendar icon hover style #INFR-8182 ([#2702](https://github.com/atinc/ngx-tethys/issues/2702)) ([94e3013](https://github.com/atinc/ngx-tethys/commit/94e3013120d4d15c4006d023d99f1d9b14179135)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **property:** should complete eventDestroy$ when component destroy ([#2703](https://github.com/atinc/ngx-tethys/issues/2703)) ([b3fe97c](https://github.com/atinc/ngx-tethys/commit/b3fe97c66d84113e47dd0db2d8fe0ec2c0a0cc00))
* **property:** should destroy the subscription of click event when the value of thyEditable is changed from true to false #INFR-8179 ([#2701](https://github.com/atinc/ngx-tethys/issues/2701)) ([ac9ba57](https://github.com/atinc/ngx-tethys/commit/ac9ba5761bc068b3359b58c76fc57937610d25c6)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)


## [15.3.7](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.7) (2023-06-05)


### Bug Fixes

* **avatar:** add constant of avatar list item space INFR-8056  ([9b96f4c](https://github.com/atinc/ngx-tethys/commit/9b96f4ca6b5f8d87a903da554aa20d6c4dfa3d6b))
* **avatar:** the overlap space of thy-avatar-list component in overlap mode is 25% of the width of avatar component #INFR-8056 ([b26ad14](https://github.com/atinc/ngx-tethys/commit/b26ad1418bf4a0548889c76ea3c17bf6f29729c1)), closes [#INFR-8056](https://github.com/atinc/ngx-tethys/issues/INFR-8056)
* **cascader:** fix it is still open when in disabled state #INFR-8141 ([#2692](https://github.com/atinc/ngx-tethys/issues/2692)) ([a73da1b](https://github.com/atinc/ngx-tethys/commit/a73da1bef1d4a75f7989f24b9f39e0910f5009fe)), closes [#INFR-8141](https://github.com/atinc/ngx-tethys/issues/INFR-8141)
* **date-picker:** #INFR-8069 shortcut support thyMinDate thyMaxDate ([#2691](https://github.com/atinc/ngx-tethys/issues/2691)) ([7f72682](https://github.com/atinc/ngx-tethys/commit/7f7268215f585c4c39d55ef50ecb66ce304ff67e)), closes [#INFR-8069](https://github.com/atinc/ngx-tethys/issues/INFR-8069)
* **date-picker:** fix both clear icon and calendar icon are displayed #INFR-8182 ([#2696](https://github.com/atinc/ngx-tethys/issues/2696)) ([f1914d3](https://github.com/atinc/ngx-tethys/commit/f1914d3a7900b4e836c2a1eb3cd7a059f3c2f40f)), closes [#INFR-8182](https://github.com/atinc/ngx-tethys/issues/INFR-8182)
* **property:** should not subscribe multiple times when the value of thyEditable is changed to true #INFR-8179 ([#2695](https://github.com/atinc/ngx-tethys/issues/2695)) ([34e600c](https://github.com/atinc/ngx-tethys/commit/34e600c579fd978b8f93cca26c52cc4e417c249c)), closes [#INFR-8179](https://github.com/atinc/ngx-tethys/issues/INFR-8179)



## [15.3.6](https://github.com/atinc/ngx-tethys/compare/15.3.5...15.3.6) (2023-05-25)


### Bug Fixes

* **date-picker:** #INFR-8051 default shortcut ranges presets end of week err ([#2689](https://github.com/atinc/ngx-tethys/issues/2689)) ([3924571](https://github.com/atinc/ngx-tethys/commit/3924571750ed238c49a26beff815ef9dc40b6552)), closes [#INFR-8051](https://github.com/atinc/ngx-tethys/issues/INFR-8051)


### Features

* **select:** support global setting placement in THY_SELECT_CONFIG and add placement examples #INFR-8025 ([#2688](https://github.com/atinc/ngx-tethys/issues/2688)) ([479fa01](https://github.com/atinc/ngx-tethys/commit/479fa01a1b256fb2d32c64cce61730017f7c4c29)), closes [#INFR-8025](https://github.com/atinc/ngx-tethys/issues/INFR-8025)



## [15.3.5](https://github.com/atinc/ngx-tethys/compare/15.3.2...15.3.5) (2023-05-23)


### Bug Fixes

* **avatar:** adjust font-size to 36px when thySize is set to 110px #INFR-7997 ([#2670](https://github.com/atinc/ngx-tethys/issues/2670)) ([1c6492e](https://github.com/atinc/ngx-tethys/commit/1c6492e728861fc90cbdc3041e56cba31012bac3)), closes [#INFR-7997](https://github.com/atinc/ngx-tethys/issues/INFR-7997)
* **input-number:** #INFR-7673 is float regular err ([#2673](https://github.com/atinc/ngx-tethys/issues/2673)) ([232f233](https://github.com/atinc/ngx-tethys/commit/232f2331c63ebb45ae904d01e823b3b19612d3f0)), closes [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673)
* **shard:** fix  view outlet error when current context and previous context are the same object  #INFR-8019 ([#2677](https://github.com/atinc/ngx-tethys/issues/2677)) ([83b4e58](https://github.com/atinc/ngx-tethys/commit/83b4e58e310357ea1fb6360a13e2f971dd2a707c)), closes [#INFR-8019](https://github.com/atinc/ngx-tethys/issues/INFR-8019)




## [15.3.4](https://github.com/atinc/ngx-tethys/compare/15.3.2...15.3.4) (2023-05-22)


### Bug Fixes

* **date-picker:** date picker config service provided in root ([#2668](https://github.com/atinc/ngx-tethys/issues/2668)) ([ec711e4](https://github.com/atinc/ngx-tethys/commit/ec711e4960416a7d5ba6bea23af9662b1fdab5bb))
* **InputNumber:** Only numbers are allowed as input #INFR-7673 ([#2663](https://github.com/atinc/ngx-tethys/issues/2663)) ([79381fe](https://github.com/atinc/ngx-tethys/commit/79381fe6d38f948d296edcae1127fe4004907cfc)), closes [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673)


### Features

* **select:** support thyDropdownWidthMode to set cdkConnectedOverlayMinWidth #INFR-7975 ([#2675](https://github.com/atinc/ngx-tethys/issues/2675)) ([2360042](https://github.com/atinc/ngx-tethys/commit/236004282d649edeb44b8085d9fc55ce25dc0ea9)), closes [#INFR-7975](https://github.com/atinc/ngx-tethys/issues/INFR-7975)



## [15.3.3](https://github.com/atinc/ngx-tethys/compare/15.3.2...15.3.3) (2023-05-22)


### Bug Fixes

* **date-picker:** date picker config service provided in root ([#2668](https://github.com/atinc/ngx-tethys/issues/2668)) ([ec711e4](https://github.com/atinc/ngx-tethys/commit/ec711e4960416a7d5ba6bea23af9662b1fdab5bb))
* **InputNumber:** Only numbers are allowed as input #INFR-7673 ([#2663](https://github.com/atinc/ngx-tethys/issues/2663)) ([79381fe](https://github.com/atinc/ngx-tethys/commit/79381fe6d38f948d296edcae1127fe4004907cfc)), closes [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673) [#INFR-7673](https://github.com/atinc/ngx-tethys/issues/INFR-7673)



## [15.3.2](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.3.2) (2023-05-19)


### Bug Fixes

* **dropdown:** add markForCheck when show menu #INFR-7971 ([#2664](https://github.com/atinc/ngx-tethys/issues/2664)) ([58bbc46](https://github.com/atinc/ngx-tethys/commit/58bbc46f2a97a46c8dfaf221f72396c66bfe2468)), closes [#INFR-7971](https://github.com/atinc/ngx-tethys/issues/INFR-7971)
* **input:** set static: false for input-group get inputDirective #INFR-7963 ([44e4416](https://github.com/atinc/ngx-tethys/commit/44e4416dcd325ebf3cee7c0ab5628a0287ea6403)), closes [#INFR-7963](https://github.com/atinc/ngx-tethys/issues/INFR-7963) [#INFR-7963](https://github.com/atinc/ngx-tethys/issues/INFR-7963)
* **select:** fix formControl set updateOn is not effect in multiple select #INFR-7825 ([#2655](https://github.com/atinc/ngx-tethys/issues/2655)) ([08991e3](https://github.com/atinc/ngx-tethys/commit/08991e3237a445dea9cdde5daec5e9d5a64ce72b)), closes [#INFR-7825](https://github.com/atinc/ngx-tethys/issues/INFR-7825)



## [15.3.1](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.3.1) (2023-05-18)


### Bug Fixes

* **avatar:** modify margin for avatar-list items #INFR-7940 ([#2659](https://github.com/atinc/ngx-tethys/issues/2659)) ([a7c0e79](https://github.com/atinc/ngx-tethys/commit/a7c0e790934c54672cb47ae4fa7c2b80f933c072)), closes [#INFR-7940](https://github.com/atinc/ngx-tethys/issues/INFR-7940)
* **cascader:** should not search empty node and fix some styles #INFR-7911 ([#2656](https://github.com/atinc/ngx-tethys/issues/2656)) ([c14e307](https://github.com/atinc/ngx-tethys/commit/c14e3077bcf3b897dd73563a2fc5ca1ed6d19701)), closes [#INFR-7911](https://github.com/atinc/ngx-tethys/issues/INFR-7911)
* **cdk:** set box-sizing to content-box #INFR-7599 ([#2647](https://github.com/atinc/ngx-tethys/issues/2647)) ([4a2eabe](https://github.com/atinc/ngx-tethys/commit/4a2eabec0790ce009e4db9a6b7d46df3569eb866)), closes [#INFR-7599](https://github.com/atinc/ngx-tethys/issues/INFR-7599)
* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **input-number:** fix not call thyBlur when focus other input-number #INFR-7496 ([#2638](https://github.com/atinc/ngx-tethys/issues/2638)) ([1caccb3](https://github.com/atinc/ngx-tethys/commit/1caccb36d1a70637e736017896269635d60a207f)), closes [#INFR-7496](https://github.com/atinc/ngx-tethys/issues/INFR-7496)
* **input:** call stopMonitoring when onDestroy #INFR-6980 ([#2648](https://github.com/atinc/ngx-tethys/issues/2648)) ([3bf8670](https://github.com/atinc/ngx-tethys/commit/3bf86702ffba0ba97fe87c987cae48942ff5e421)), closes [#INFR-6980](https://github.com/atinc/ngx-tethys/issues/INFR-6980)
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Code Refactoring

* **avatar:** remove avatar-list thyResponsive feature #INFR-7678 ([#2654](https://github.com/atinc/ngx-tethys/issues/2654)) ([b6933f3](https://github.com/atinc/ngx-tethys/commit/b6933f342095c5dfbaaba0da3cab182db0bc859a)), closes [#INFR-7678](https://github.com/atinc/ngx-tethys/issues/INFR-7678)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)
* **upload:** feat(upload):adjust the acceptType support to THY_UPLOAD_DEFAULT_OPTIONS #INFR-7816 ([d69a191](https://github.com/atinc/ngx-tethys/commit/d69a191722507067e05be7cfbf6cc4688614deaa)), closes [#INFR-7816](https://github.com/atinc/ngx-tethys/issues/INFR-7816)


### BREAKING CHANGES

* **avatar:** - remove avatar-list thyResponsive feature. And thyMax also removed.



# [15.3.0](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.3.0) (2023-05-17)


### Bug Fixes

* **cascader:** should not search empty node and fix some styles #INFR-7911 ([#2656](https://github.com/atinc/ngx-tethys/issues/2656)) ([c14e307](https://github.com/atinc/ngx-tethys/commit/c14e3077bcf3b897dd73563a2fc5ca1ed6d19701)), closes [#INFR-7911](https://github.com/atinc/ngx-tethys/issues/INFR-7911)
* **cdk:** set box-sizing to content-box #INFR-7599 ([#2647](https://github.com/atinc/ngx-tethys/issues/2647)) ([4a2eabe](https://github.com/atinc/ngx-tethys/commit/4a2eabec0790ce009e4db9a6b7d46df3569eb866)), closes [#INFR-7599](https://github.com/atinc/ngx-tethys/issues/INFR-7599)
* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **input-number:** fix not call thyBlur when focus other input-number #INFR-7496 ([#2638](https://github.com/atinc/ngx-tethys/issues/2638)) ([1caccb3](https://github.com/atinc/ngx-tethys/commit/1caccb36d1a70637e736017896269635d60a207f)), closes [#INFR-7496](https://github.com/atinc/ngx-tethys/issues/INFR-7496)
* **input:** call stopMonitoring when onDestroy #INFR-6980 ([#2648](https://github.com/atinc/ngx-tethys/issues/2648)) ([3bf8670](https://github.com/atinc/ngx-tethys/commit/3bf86702ffba0ba97fe87c987cae48942ff5e421)), closes [#INFR-6980](https://github.com/atinc/ngx-tethys/issues/INFR-6980)
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Code Refactoring

* **avatar:** remove avatar-list thyResponsive feature #INFR-7678 ([#2654](https://github.com/atinc/ngx-tethys/issues/2654)) ([b6933f3](https://github.com/atinc/ngx-tethys/commit/b6933f342095c5dfbaaba0da3cab182db0bc859a)), closes [#INFR-7678](https://github.com/atinc/ngx-tethys/issues/INFR-7678)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)
* **upload:** feat(upload):adjust the acceptType support to THY_UPLOAD_DEFAULT_OPTIONS #INFR-7816 ([d69a191](https://github.com/atinc/ngx-tethys/commit/d69a191722507067e05be7cfbf6cc4688614deaa)), closes [#INFR-7816](https://github.com/atinc/ngx-tethys/issues/INFR-7816)


### BREAKING CHANGES

* **avatar:** - remove avatar-list thyResponsive feature. And thyMax also removed.



## [15.2.11](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.11) (2023-05-11)


### Bug Fixes

* **cdk:** set box-sizing to content-box #INFR-7599 ([#2647](https://github.com/atinc/ngx-tethys/issues/2647)) ([4a2eabe](https://github.com/atinc/ngx-tethys/commit/4a2eabec0790ce009e4db9a6b7d46df3569eb866)), closes [#INFR-7599](https://github.com/atinc/ngx-tethys/issues/INFR-7599)
* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **input-number:** fix not call thyBlur when focus other input-number #INFR-7496 ([#2638](https://github.com/atinc/ngx-tethys/issues/2638)) ([1caccb3](https://github.com/atinc/ngx-tethys/commit/1caccb36d1a70637e736017896269635d60a207f)), closes [#INFR-7496](https://github.com/atinc/ngx-tethys/issues/INFR-7496)
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)
* **upload:** feat(upload):adjust the acceptType support to THY_UPLOAD_DEFAULT_OPTIONS #INFR-7816 ([d69a191](https://github.com/atinc/ngx-tethys/commit/d69a191722507067e05be7cfbf6cc4688614deaa)), closes [#INFR-7816](https://github.com/atinc/ngx-tethys/issues/INFR-7816)



## [15.2.10](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.10) (2023-05-10)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **input-number:** fix not call thyBlur when focus other input-number #INFR-7496 ([#2638](https://github.com/atinc/ngx-tethys/issues/2638)) ([1caccb3](https://github.com/atinc/ngx-tethys/commit/1caccb36d1a70637e736017896269635d60a207f)), closes [#INFR-7496](https://github.com/atinc/ngx-tethys/issues/INFR-7496)
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)



## [15.2.9](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.9) (2023-05-06)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **input-number:** fix not call thyBlur when focus other input-number #INFR-7496 ([#2638](https://github.com/atinc/ngx-tethys/issues/2638)) ([1caccb3](https://github.com/atinc/ngx-tethys/commit/1caccb36d1a70637e736017896269635d60a207f)), closes [#INFR-7496](https://github.com/atinc/ngx-tethys/issues/INFR-7496)
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)



## [15.2.8](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.8) (2023-05-05)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Features

* **cascader:** support search #INFR-7498 ([#2644](https://github.com/atinc/ngx-tethys/issues/2644)) ([f490007](https://github.com/atinc/ngx-tethys/commit/f4900077721f2a95bf8116a93e351f767d637b78)), closes [#INFR-7498](https://github.com/atinc/ngx-tethys/issues/INFR-7498)
* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)



## [15.2.7](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.7) (2023-05-04)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))
* **tree:** fix the problem of clicking to disable the parent node #INFR-7545 ([#2639](https://github.com/atinc/ngx-tethys/issues/2639)) ([4936aba](https://github.com/atinc/ngx-tethys/commit/4936aba4890c891f5792bf46d6df86802e095e3a)), closes [#INFR-7545](https://github.com/atinc/ngx-tethys/issues/INFR-7545)


### Features

* **color-picker:** support hover trigger #INFR-7525 ([#2642](https://github.com/atinc/ngx-tethys/issues/2642)) ([78b5c7a](https://github.com/atinc/ngx-tethys/commit/78b5c7ac34e5fc897cbdac40579c12aeee25d991)), closes [#INFR-7525](https://github.com/atinc/ngx-tethys/issues/INFR-7525)
* **color-picker:** support thyPlacement params #INFR-7526 ([#2637](https://github.com/atinc/ngx-tethys/issues/2637)) ([366f742](https://github.com/atinc/ngx-tethys/commit/366f742859fd39c4f61ff04c2715aae96632a05b)), closes [#INFR-7526](https://github.com/atinc/ngx-tethys/issues/INFR-7526)



## [15.2.6](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.6) (2023-04-26)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)
* **layout:** fix can't operate layout content ([#2635](https://github.com/atinc/ngx-tethys/issues/2635)) ([0c7ce6f](https://github.com/atinc/ngx-tethys/commit/0c7ce6f506db35fec9f523b2b3f5087df8810d64))



## [15.2.5](https://github.com/atinc/ngx-tethys/compare/15.2.4...15.2.5) (2023-04-26)


### Bug Fixes

* **date-picker:** compatibility null values at updateHourMinute ([#2633](https://github.com/atinc/ngx-tethys/issues/2633)) ([1207c47](https://github.com/atinc/ngx-tethys/commit/1207c473f98c18d8a30dc4d2e00b002b86aeb246))
* **layout:** collapse dom appears when the mouse hovers over the sidebar #INFR-5569 ([#2616](https://github.com/atinc/ngx-tethys/issues/2616)) ([e9b925d](https://github.com/atinc/ngx-tethys/commit/e9b925dce96175ac8f2b6eb1a48503391f877fc3)), closes [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569) [#INFR-5569](https://github.com/atinc/ngx-tethys/issues/INFR-5569)



## [15.2.4](https://github.com/atinc/ngx-tethys/compare/15.2.3...15.2.4) (2023-04-24)


### Bug Fixes

* **tree:** use thyBeforeDragStart to change the visibility of the drag icon when disabled #INFR-7502 ([#2630](https://github.com/atinc/ngx-tethys/issues/2630)) ([ec04ef2](https://github.com/atinc/ngx-tethys/commit/ec04ef253a08e0866fdc28e050f19d1dc136be61)), closes [#INFR-7502](https://github.com/atinc/ngx-tethys/issues/INFR-7502)


### Features

* **table:** table class(.table-hover) delete table hover set space-none style #INFR-7471 ([4a8c974](https://github.com/atinc/ngx-tethys/commit/4a8c974d0bacf213ed9e2d57e02382dc410e0a8d)), closes [#INFR-7471](https://github.com/atinc/ngx-tethys/issues/INFR-7471)
* **table:** table class(.table-hover) delete table hover set space-none style update #INFR-7471 ([d76b6ec](https://github.com/atinc/ngx-tethys/commit/d76b6ecaa176d269681a5f6c7f15face8368b59d)), closes [#INFR-7471](https://github.com/atinc/ngx-tethys/issues/INFR-7471)



## [15.2.3](https://github.com/atinc/ngx-tethys/compare/15.2.2...15.2.3) (2023-04-23)


### Bug Fixes

* **checkbox:** indeterminate  checkbox add disable style and examples #INFR-7443 ([#2625](https://github.com/atinc/ngx-tethys/issues/2625)) ([2ff4100](https://github.com/atinc/ngx-tethys/commit/2ff4100559111a7d71df02c53d745b85e0d6a90c)), closes [#INFR-7443](https://github.com/atinc/ngx-tethys/issues/INFR-7443)
* **tree:** cursor style change drag-icon used pointer and disabled used default #INFR-7468 ([#2620](https://github.com/atinc/ngx-tethys/issues/2620)) ([3984b91](https://github.com/atinc/ngx-tethys/commit/3984b91150ce9667a95a994e196d32c58e7b864b)), closes [#INFR-7468](https://github.com/atinc/ngx-tethys/issues/INFR-7468)
* **tree:** fixed thy-tree-node-check corsor style when disabled expand or draggable #INFR-7477 ([#2624](https://github.com/atinc/ngx-tethys/issues/2624)) ([0ea3164](https://github.com/atinc/ngx-tethys/commit/0ea31644521aef24518e990fd2640637aa69f841)), closes [#INFR-7477](https://github.com/atinc/ngx-tethys/issues/INFR-7477)



## [15.2.2](https://github.com/atinc/ngx-tethys/compare/15.2.1...15.2.2) (2023-04-20)


### Bug Fixes

* **date-picker:** update date time after select time and then date #INFR-7352 ([#2614](https://github.com/atinc/ngx-tethys/issues/2614)) ([acc8b3f](https://github.com/atinc/ngx-tethys/commit/acc8b3f538cce407e99e5c8b7b3741629ea8e585)), closes [#INFR-7352](https://github.com/atinc/ngx-tethys/issues/INFR-7352)
* fix lint error ([fc4b790](https://github.com/atinc/ngx-tethys/commit/fc4b79055ba4e1a7e804af8f3d6387d87e4811bf))


### Features

* **flexible-text:** flexible-text suppoort tooltip offset #INFR-7382 ([1883d52](https://github.com/atinc/ngx-tethys/commit/1883d52b2bc7b9830a3b97f89a3099860fe8c7df)), closes [#INFR-7382](https://github.com/atinc/ngx-tethys/issues/INFR-7382)
* **tree-select:** add thyOnExpandStatusChange at tree-select #INFR-7442 ([#2617](https://github.com/atinc/ngx-tethys/issues/2617)) ([7ccb3aa](https://github.com/atinc/ngx-tethys/commit/7ccb3aac2c06f196c9012bded38f99eca6f974ce)), closes [#INFR-7442](https://github.com/atinc/ngx-tethys/issues/INFR-7442) [#INFR-7442](https://github.com/atinc/ngx-tethys/issues/INFR-7442)



## [15.2.1](https://github.com/atinc/ngx-tethys/compare/15.2.0...15.2.1) (2023-04-19)


### Bug Fixes

* **tree:** disabled tree node show dragIcon when mouseenter #INFR-7405 ([#2611](https://github.com/atinc/ngx-tethys/issues/2611)) ([2e7506b](https://github.com/atinc/ngx-tethys/commit/2e7506b3c06f9a7f21018f1a69b21fd5018b6066)), closes [#INFR-7405](https://github.com/atinc/ngx-tethys/issues/INFR-7405)


### Features

* **input:** thy-input-group should has blue border when inner input focused #INFR-6980 ([b06543e](https://github.com/atinc/ngx-tethys/commit/b06543e4d0c18e8958be5d06fd61aef0a2301bb7)), closes [#INFR-6980](https://github.com/atinc/ngx-tethys/issues/INFR-6980)
* **tree:** add thyClickBehavior to handle the interaction of clicking node #INFR-7426 [@wangkai](https://github.com/wangkai) [@guoxin](https://github.com/guoxin) [@why520crazy](https://github.com/why520crazy) ([#2612](https://github.com/atinc/ngx-tethys/issues/2612)) ([fb7987b](https://github.com/atinc/ngx-tethys/commit/fb7987b6e9b8cc461cfc066a037aa9115d797514)), closes [#INFR-7426](https://github.com/atinc/ngx-tethys/issues/INFR-7426)
* **tree:** click node to expandNode when the node is disabled #INFR-7429 ([#2613](https://github.com/atinc/ngx-tethys/issues/2613)) ([ff8dda4](https://github.com/atinc/ngx-tethys/commit/ff8dda41e96c28c123889a94e466603fecdecd82)), closes [#INFR-7429](https://github.com/atinc/ngx-tethys/issues/INFR-7429)



# [15.2.0](https://github.com/atinc/ngx-tethys/compare/15.1.0...15.2.0) (2023-04-14)


### Bug Fixes

* **core:** set default number value is null for @InputNumber decorator ([#2609](https://github.com/atinc/ngx-tethys/issues/2609)) ([547413a](https://github.com/atinc/ngx-tethys/commit/547413ab37c31836f46ed7ceba4b63728b14d13a))
* **tree:** prevent modification of selected state of disabled nodes #INFR-7372 ([#2608](https://github.com/atinc/ngx-tethys/issues/2608)) ([d2b672a](https://github.com/atinc/ngx-tethys/commit/d2b672ab6a0301850d353b51f518f68af196a3fc)), closes [#INFR-7372](https://github.com/atinc/ngx-tethys/issues/INFR-7372)



# [15.1.0](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.5...15.1.0) (2023-04-11)


### Bug Fixes

* **cascader:** fix overlay-positions  #INFR-7164 ([#2603](https://github.com/atinc/ngx-tethys/issues/2603)) ([00d95f5](https://github.com/atinc/ngx-tethys/commit/00d95f50c7fce3d907f5cfab180053c937bc5028)), closes [#INFR-7164](https://github.com/atinc/ngx-tethys/issues/INFR-7164)



# [15.1.0-next.5](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.4...15.1.0-next.5) (2023-04-06)


### Bug Fixes

* **style:** set cdkConnectedOverlayMinWidth #INFR-6979 ([#2593](https://github.com/atinc/ngx-tethys/issues/2593)) ([7e52bef](https://github.com/atinc/ngx-tethys/commit/7e52befb1b114ef5ae952dca8482bec44b5b7d91)), closes [#INFR-6979](https://github.com/atinc/ngx-tethys/issues/INFR-6979)


### Features

* **cascader:** support disabled for multi mode #INFR-7093 ([#2591](https://github.com/atinc/ngx-tethys/issues/2591)) ([7ad62b0](https://github.com/atinc/ngx-tethys/commit/7ad62b0451b53f9e0a3c53305309c78401454908)), closes [#INFR-7093](https://github.com/atinc/ngx-tethys/issues/INFR-7093)
* **select:** adjust text with search result is empty #INFR-7112 ([#2592](https://github.com/atinc/ngx-tethys/issues/2592)) ([d42b9d7](https://github.com/atinc/ngx-tethys/commit/d42b9d72b2bd2a42b445439c891f61a74fadfc2f)), closes [#INFR-7112](https://github.com/atinc/ngx-tethys/issues/INFR-7112)



# [15.1.0-next.4](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.3...15.1.0-next.4) (2023-03-29)


### Bug Fixes

* **cascader:** fix style for empty #INFR-6979 ([#2587](https://github.com/atinc/ngx-tethys/issues/2587)) ([e7e8680](https://github.com/atinc/ngx-tethys/commit/e7e86801f22d01475394f468d451fbea3e1d7e34)), closes [#INFR-6979](https://github.com/atinc/ngx-tethys/issues/INFR-6979)
* **select:** add manualFocusing flag indicates whether automatic focus input, set true when manual focus select ([#2589](https://github.com/atinc/ngx-tethys/issues/2589)) ([e047ee0](https://github.com/atinc/ngx-tethys/commit/e047ee02729f34bceb5d82269ff88f8027b30f63))


### Features

* **style:** add class pe-none and pe-auto #INFR-7083 ([#2588](https://github.com/atinc/ngx-tethys/issues/2588)) ([64de9d6](https://github.com/atinc/ngx-tethys/commit/64de9d684e4488c0daf2f4582e13c19dd527787f)), closes [#INFR-7083](https://github.com/atinc/ngx-tethys/issues/INFR-7083)



# [15.1.0-next.3](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.2...15.1.0-next.3) (2023-03-27)



# [15.1.0-next.2](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.1...15.1.0-next.2) (2023-03-27)


### Bug Fixes

* **select:** fix customer-select cursor is still alive when blur ([b7db3be](https://github.com/atinc/ngx-tethys/commit/b7db3be4aa39e2f737b5586000e76c42d5a82ffc))


### Features

* **dropdown:** #INFR-3381 add common parameters [@guoxin](https://github.com/guoxin) [@haifeng](https://github.com/haifeng) ([#2583](https://github.com/atinc/ngx-tethys/issues/2583)) ([d242aa4](https://github.com/atinc/ngx-tethys/commit/d242aa4ca25e80400b41bcfd78352f67c28381e3)), closes [#INFR-3381](https://github.com/atinc/ngx-tethys/issues/INFR-3381) [#INFR-3381](https://github.com/atinc/ngx-tethys/issues/INFR-3381)



# [15.1.0-next.1](https://github.com/atinc/ngx-tethys/compare/15.1.0-next.0...15.1.0-next.1) (2023-03-22)


### Bug Fixes

* **form:** fix form input-group customer-select switch ui error #INFR… ([#2577](https://github.com/atinc/ngx-tethys/issues/2577)) ([5fb8fad](https://github.com/atinc/ngx-tethys/commit/5fb8fad9557eef9ff658e749552e2b7a2903ff51))
* **fullscreen:** exit function add judge #INFR-6933 ([#2575](https://github.com/atinc/ngx-tethys/issues/2575)) ([2d40fe6](https://github.com/atinc/ngx-tethys/commit/2d40fe6838491454593ef70508f8ecd7bba01829)), closes [#INFR-6933](https://github.com/atinc/ngx-tethys/issues/INFR-6933)


### Features

* **cascader:** echo the value when the option is disabled #INFR-6936 [@guoxin](https://github.com/guoxin) ([#2573](https://github.com/atinc/ngx-tethys/issues/2573)) ([b2e217b](https://github.com/atinc/ngx-tethys/commit/b2e217b6aec69f5987962a757e351eb268017876)), closes [#INFR-6936](https://github.com/atinc/ngx-tethys/issues/INFR-6936) [#INFR-6936](https://github.com/atinc/ngx-tethys/issues/INFR-6936)
* **DatePicker:** #INFR-6720 DatePick supports shortcut selection ([#2567](https://github.com/atinc/ngx-tethys/issues/2567)) ([fb507d2](https://github.com/atinc/ngx-tethys/commit/fb507d2c744facf411c9c5acf4d29af9aab06a76)), closes [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720) [#INFR-6720](https://github.com/atinc/ngx-tethys/issues/INFR-6720)



# [15.1.0-next.0](https://github.com/atinc/ngx-tethys/compare/15.0.0...15.1.0-next.0) (2023-03-14)


### Features

* **forms:** support reactive forms #INFR-5805 ([#2444](https://github.com/atinc/ngx-tethys/issues/2444)) ([eeddb2f](https://github.com/atinc/ngx-tethys/commit/eeddb2fdc9661a20985d157966de758cf0edcf9e)), closes [#INFR-5805](https://github.com/atinc/ngx-tethys/issues/INFR-5805)



# [15.0.0](https://github.com/atinc/ngx-tethys/compare/14.2.24...15.0.0) (2023-03-09)


### Features

* **cdk:** refactor behaviors  for useAction and useAsync ([de4b6f7](https://github.com/atinc/ngx-tethys/commit/de4b6f7421316a5230a21e19e867eee29daaccba))
* upgrade ng to 15 ([043fa4f](https://github.com/atinc/ngx-tethys/commit/043fa4fcbb443010035098854552ff372aa877bd))



# [15.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/14.2.15...15.0.0-next.3) (2023-02-07)


### Features

* **cdk:** add defaultErrorHandler for ActionBehavior ([1ad2f02](https://github.com/atinc/ngx-tethys/commit/1ad2f026b0764f7b995504893c1be9912439e365))
* **schematics:** add migration-v15 ([44a6264](https://github.com/atinc/ngx-tethys/commit/44a6264f0160e5671b3487be3814d56ebf6db09b))



# [15.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/15.0.0-next.1...15.0.0-next.2) (2023-02-02)



# [15.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.2.14...15.0.0-next.1) (2023-02-02)


### Features

* upgrade ng to 15 ([33a1e13](https://github.com/atinc/ngx-tethys/commit/33a1e13caacf1e16a352c6c70d733d73228b5b5d))



# [15.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/15.0.0-next.3...15.0.0-next.4) (2023-02-16)



# [15.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/14.2.15...15.0.0-next.3) (2023-02-07)


### Bug Fixes

* **dialog:** invoke onCancel for confirm when click cancel button #INFR-1636 ([#2512](https://github.com/atinc/ngx-tethys/issues/2512)) ([5480dbd](https://github.com/atinc/ngx-tethys/commit/5480dbd1d4f38e04d9dadcd073501c9ae32b2c17)), closes [#INFR-1636](https://github.com/atinc/ngx-tethys/issues/INFR-1636)


### Features

* **cdk:** add defaultErrorHandler for ActionBehavior ([1ad2f02](https://github.com/atinc/ngx-tethys/commit/1ad2f026b0764f7b995504893c1be9912439e365))
* **schematics:** add migration-v15 ([44a6264](https://github.com/atinc/ngx-tethys/commit/44a6264f0160e5671b3487be3814d56ebf6db09b))



# [15.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/15.0.0-next.1...15.0.0-next.2) (2023-02-02)



# [15.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.2.14...15.0.0-next.1) (2023-02-02)


### Features

* upgrade ng to 15 ([33a1e13](https://github.com/atinc/ngx-tethys/commit/33a1e13caacf1e16a352c6c70d733d73228b5b5d))



# [15.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.2.14...15.0.0-next.1) (2023-02-02)


### Bug Fixes

* **dot:** incorrect display when the attribute size is lg or xlg and the theme is outline #INFR-6240 ([fc61953](https://github.com/atinc/ngx-tethys/commit/fc6195396c00a434e359b72b0d4efa4541481587)), closes [#INFR-6240](https://github.com/atinc/ngx-tethys/issues/INFR-6240)


### Features

* **form:** add more way to validate form #INFR-2972 ([#2370](https://github.com/atinc/ngx-tethys/issues/2370)) ([7937de3](https://github.com/atinc/ngx-tethys/commit/7937de36ba22f13d3e63b26f5720546d67bfd501)), closes [#INFR-2972](https://github.com/atinc/ngx-tethys/issues/INFR-2972)
* upgrade ng to 15 ([33a1e13](https://github.com/atinc/ngx-tethys/commit/33a1e13caacf1e16a352c6c70d733d73228b5b5d))



# [15.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/14.2.14...15.0.0-next.0) (2023-02-02)


### Bug Fixes

* **dot:** incorrect display when the attribute size is lg or xlg and the theme is outline #INFR-6240 ([fc61953](https://github.com/atinc/ngx-tethys/commit/fc6195396c00a434e359b72b0d4efa4541481587)), closes [#INFR-6240](https://github.com/atinc/ngx-tethys/issues/INFR-6240)


### Features

* **form:** add more way to validate form #INFR-2972 ([#2370](https://github.com/atinc/ngx-tethys/issues/2370)) ([7937de3](https://github.com/atinc/ngx-tethys/commit/7937de36ba22f13d3e63b26f5720546d67bfd501)), closes [#INFR-2972](https://github.com/atinc/ngx-tethys/issues/INFR-2972)
* upgrade ng to 15 ([7f21c0c](https://github.com/atinc/ngx-tethys/commit/7f21c0c091a0e43faecbf92cf59161cc1a2fd341))

## [14.2.24](https://github.com/atinc/ngx-tethys/compare/14.2.23...14.2.24) (2023-03-08)


### Bug Fixes

* **select:** fix remove selected fail when option disabled #INFR-6756 [@xujing](https://github.com/xujing) [@wumeimin](https://github.com/wumeimin) (#INFR-6756) ([#2561](https://github.com/atinc/ngx-tethys/issues/2561)) ([3e5ffb7](https://github.com/atinc/ngx-tethys/commit/3e5ffb78d54d1dd01240c989b05b894c0f8d60cd)), closes [#INFR-6756](https://github.com/atinc/ngx-tethys/issues/INFR-6756) [#INFR-6756](https://github.com/atinc/ngx-tethys/issues/INFR-6756)
* **table:** fix error when set thyWholeRowSelect="true" #INFR-6693 ([#2560](https://github.com/atinc/ngx-tethys/issues/2560)) ([455327b](https://github.com/atinc/ngx-tethys/commit/455327bb9bad19b1823511c2db51f43e5164783d)), closes [#INFR-6693](https://github.com/atinc/ngx-tethys/issues/INFR-6693)



## [14.2.23](https://github.com/atinc/ngx-tethys/compare/14.2.21...14.2.23) (2023-03-02)


### Bug Fixes

* **date-picker:** fix quick select label style justify content center #INFR-5621 ([#2557](https://github.com/atinc/ngx-tethys/issues/2557)) ([6f16b1e](https://github.com/atinc/ngx-tethys/commit/6f16b1e314d92638900148f4754373d585921b96)), closes [#INFR-5621](https://github.com/atinc/ngx-tethys/issues/INFR-5621)
* **date-picker:** same month does not appear twice in week range picker and adjust week range width #INFR-6644 ([#2554](https://github.com/atinc/ngx-tethys/issues/2554)) ([84d1cbe](https://github.com/atinc/ngx-tethys/commit/84d1cbeb945c18dda332f16ff595900232ea4871)), closes [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644) [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644) [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644) [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644) [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644) [#INFR-6644](https://github.com/atinc/ngx-tethys/issues/INFR-6644)
* **input-number:** fix display null when thyMin or thyMax is null#INFR-6594 ([#2547](https://github.com/atinc/ngx-tethys/issues/2547)) ([3a49083](https://github.com/atinc/ngx-tethys/commit/3a490839d80fcf452beb4dffbe9e4e1c8b307ad3)), closes [null#INFR-6594](https://github.com/null/issues/INFR-6594) [null#INFR-6594](https://github.com/null/issues/INFR-6594)


### Features

* **avatar:** add thy-avatar-list #INFR-5295 [#2525](https://github.com/atinc/ngx-tethys/issues/2525) ([#2526](https://github.com/atinc/ngx-tethys/issues/2526)) ([112eac3](https://github.com/atinc/ngx-tethys/commit/112eac3ff65a78b9a3305195d46464cf5256218e)), closes [#INFR-5295](https://github.com/atinc/ngx-tethys/issues/INFR-5295)
* **layout:** sidebar support dblclick restore to default width #INFR-6017 ([#2551](https://github.com/atinc/ngx-tethys/issues/2551)) ([06d85ad](https://github.com/atinc/ngx-tethys/commit/06d85ad1fba810837915bf8df688c91003eca8ea)), closes [#INFR-6017](https://github.com/atinc/ngx-tethys/issues/INFR-6017) [#INFR-6017](https://github.com/atinc/ngx-tethys/issues/INFR-6017)
* **popover:** support popover hader template and add test(#INFR-6586) ([#2549](https://github.com/atinc/ngx-tethys/issues/2549)) ([d5dff36](https://github.com/atinc/ngx-tethys/commit/d5dff368b8cb0f27821ae689f81671b639826ad1)), closes [#INFR-6586](https://github.com/atinc/ngx-tethys/issues/INFR-6586)
* send message and merge after pub  #INFR-6280 ([9353382](https://github.com/atinc/ngx-tethys/commit/9353382acc00bec1545abb6ba7e4daf21935d10b)), closes [#INFR-6280](https://github.com/atinc/ngx-tethys/issues/INFR-6280)



## [14.2.22](https://github.com/atinc/ngx-tethys/compare/14.2.21...14.2.22) (2023-02-27)


### Features

* **avatar:** add thy-avatar-list #INFR-5295 [#2525](https://github.com/atinc/ngx-tethys/issues/2525) ([#2526](https://github.com/atinc/ngx-tethys/issues/2526)) ([112eac3](https://github.com/atinc/ngx-tethys/commit/112eac3ff65a78b9a3305195d46464cf5256218e)), closes [#INFR-5295](https://github.com/atinc/ngx-tethys/issues/INFR-5295)
* **popover:** support popover hader template and add test(#INFR-6586) ([#2549](https://github.com/atinc/ngx-tethys/issues/2549)) ([d5dff36](https://github.com/atinc/ngx-tethys/commit/d5dff368b8cb0f27821ae689f81671b639826ad1)), closes [#INFR-6586](https://github.com/atinc/ngx-tethys/issues/INFR-6586)
* send message and merge after pub  #INFR-6280 ([9353382](https://github.com/atinc/ngx-tethys/commit/9353382acc00bec1545abb6ba7e4daf21935d10b)), closes [#INFR-6280](https://github.com/atinc/ngx-tethys/issues/INFR-6280)



## [14.2.21](https://github.com/atinc/ngx-tethys/compare/14.2.20...14.2.21) (2023-02-22)


### Bug Fixes

* **message、notify:** merge custom global config and default global config  #INFR-6570 ([cacfa66](https://github.com/atinc/ngx-tethys/commit/cacfa6636ea27cfa37e801269e7b6f424857ab2a)), closes [#INFR-6570](https://github.com/atinc/ngx-tethys/issues/INFR-6570)
* **styles:** use variables to prevent packing optimization #INFR-6526 ([#2545](https://github.com/atinc/ngx-tethys/issues/2545)) ([52a349f](https://github.com/atinc/ngx-tethys/commit/52a349f2c8b3ff1e6a49b8161db0d6af1b2b5bcd)), closes [#INFR-6526](https://github.com/atinc/ngx-tethys/issues/INFR-6526)


### Features

* **progress:** fixed text width 40px #INFR-6551 ([#2542](https://github.com/atinc/ngx-tethys/issues/2542)) ([18d88d3](https://github.com/atinc/ngx-tethys/commit/18d88d30a5e6068efe2d159b0817634cc520110e)), closes [#INFR-6551](https://github.com/atinc/ngx-tethys/issues/INFR-6551)



## [14.2.20](https://github.com/atinc/ngx-tethys/compare/14.2.19...14.2.20) (2023-02-21)


### Bug Fixes

* **image:** use width / height to prevent css packing optimization #INFR-6526 ([358b39b](https://github.com/atinc/ngx-tethys/commit/358b39bae3b4e0f2aae361c0c05cfaadc64837b5)), closes [#INFR-6526](https://github.com/atinc/ngx-tethys/issues/INFR-6526)



## [14.2.19](https://github.com/atinc/ngx-tethys/compare/14.2.18...14.2.19) (2023-02-17)


### Features

* **input:** remove the thyAutocomplete of thyInput & thy-input #INFR-6523 ([#2538](https://github.com/atinc/ngx-tethys/issues/2538)) ([92f753e](https://github.com/atinc/ngx-tethys/commit/92f753ec05140c60bacc8a1eca832709c7b8aaf3)), closes [#INFR-6523](https://github.com/atinc/ngx-tethys/issues/INFR-6523)
* **tooltip:** add tooltip service and tooltipRef, refactor tooltip directive #INFR-6382 ([#2532](https://github.com/atinc/ngx-tethys/issues/2532)) ([27d4bf3](https://github.com/atinc/ngx-tethys/commit/27d4bf3aab5536df57241526ad5bdae7a6c18df8)), closes [#INFR-6382](https://github.com/atinc/ngx-tethys/issues/INFR-6382)



## [14.2.18](https://github.com/atinc/ngx-tethys/compare/14.2.17...14.2.18) (2023-02-16)


### Bug Fixes

* **date-picker:**  add test for dataPicker #INFR-6466 ([fa0ce33](https://github.com/atinc/ngx-tethys/commit/fa0ce33ae6b838c838524e3534c90c0e692cd64c)), closes [#INFR-6466](https://github.com/atinc/ngx-tethys/issues/INFR-6466)
* **DatePicker:** show week  at thyRangePickerDirective  #INFR-6466 ([431e543](https://github.com/atinc/ngx-tethys/commit/431e543b6dc26acdbcc2e6dcdf76b754e2bffece)), closes [#INFR-6466](https://github.com/atinc/ngx-tethys/issues/INFR-6466)
* **input-number:** change disabled class in handler after modify thyMax or thyMin ([62b2d94](https://github.com/atinc/ngx-tethys/commit/62b2d94ac67455ef63125820c590f3bb064c13ee))


### Features

* **autocomplete:** add thyAutocomplete selector to ThyAutocompleteTriggerDirective and replace thyAutocompleteTrigger selector  #INFR-2990 ([4834ae3](https://github.com/atinc/ngx-tethys/commit/4834ae3852a9915246c568da76d9b82ccf3436db)), closes [#INFR-2990](https://github.com/atinc/ngx-tethys/issues/INFR-2990)



## [14.2.17](https://github.com/atinc/ngx-tethys/compare/14.2.16...14.2.17) (2023-02-15)


### Bug Fixes

* **cascader:** fix long text style #INFR-6460 ([#2528](https://github.com/atinc/ngx-tethys/issues/2528)) ([97c9800](https://github.com/atinc/ngx-tethys/commit/97c98004ce7a3d3e95fd191b52a1ba1edfece203)), closes [#INFR-6460](https://github.com/atinc/ngx-tethys/issues/INFR-6460)
* **input:** modify the spacing of the input and the perpand to 8 px #INFR-6441 ([4ed58b1](https://github.com/atinc/ngx-tethys/commit/4ed58b152813078874dac3b2666636e2b72d47ea)), closes [#INFR-6441](https://github.com/atinc/ngx-tethys/issues/INFR-6441)


### Features

* **avatar:** thySize supports setting the value to 16 #INFR-6422 ([#2522](https://github.com/atinc/ngx-tethys/issues/2522)) ([02672bd](https://github.com/atinc/ngx-tethys/commit/02672bda63ed2d76bf215521486438f4dcec6a7a)), closes [#INFR-6422](https://github.com/atinc/ngx-tethys/issues/INFR-6422)



## [14.2.16](https://github.com/atinc/ngx-tethys/compare/14.2.15...14.2.16) (2023-02-10)


### Bug Fixes

* **dialog:** invoke onCancel for confirm when click cancel button #INFR-1636 ([#2512](https://github.com/atinc/ngx-tethys/issues/2512)) ([5480dbd](https://github.com/atinc/ngx-tethys/commit/5480dbd1d4f38e04d9dadcd073501c9ae32b2c17)), closes [#INFR-1636](https://github.com/atinc/ngx-tethys/issues/INFR-1636)
* **nav:** fix border style when nav has extra#INFR-6418 ([#2520](https://github.com/atinc/ngx-tethys/issues/2520)) ([6e05c7f](https://github.com/atinc/ngx-tethys/commit/6e05c7f14cac7686d139d58a7b1a4efe32b9942f)), closes [extra#INFR-6418](https://github.com/extra/issues/INFR-6418)
* **progress:** align bar with text#INFR-6381 ([#2517](https://github.com/atinc/ngx-tethys/issues/2517)) ([12bcac0](https://github.com/atinc/ngx-tethys/commit/12bcac09726c0d7d6d19642075d204fdc87c45cf)), closes [text#INFR-6381](https://github.com/text/issues/INFR-6381)
* **property:** fix property display and editor switching bug #INFR-6165 ([#2501](https://github.com/atinc/ngx-tethys/issues/2501)) ([4de8cd1](https://github.com/atinc/ngx-tethys/commit/4de8cd1abcf32dfcd877862c4f35ad6fb4f35f8a)), closes [#INFR-6165](https://github.com/atinc/ngx-tethys/issues/INFR-6165)


### Features

* **color-picker:** #INFR-6390 add thyPanelOpen & thyPanelClose [@wanghuan](https://github.com/wanghuan) [@guoxin](https://github.com/guoxin) ([#2518](https://github.com/atinc/ngx-tethys/issues/2518)) ([9209a77](https://github.com/atinc/ngx-tethys/commit/9209a77c200835fbab3cf83ef071d052ab574314))
* **dialog:** change dialog and slide close button color form #cacaca to [#999](https://github.com/atinc/ngx-tethys/issues/999) #INFR-6394 [@xuhaifeng](https://github.com/xuhaifeng) [@wangkai](https://github.com/wangkai) ([#2519](https://github.com/atinc/ngx-tethys/issues/2519)) ([b7419b6](https://github.com/atinc/ngx-tethys/commit/b7419b6ec6ce6dbe693237fb6376b666d2c7c0c0)), closes [#INFR-6394](https://github.com/atinc/ngx-tethys/issues/INFR-6394)
* **progress:** ng-content display on the right #INFR-6205 ([#2516](https://github.com/atinc/ngx-tethys/issues/2516)) ([109870a](https://github.com/atinc/ngx-tethys/commit/109870a03557dd16e28bf335cb2da168f00aa6d2)), closes [#INFR-6205](https://github.com/atinc/ngx-tethys/issues/INFR-6205)



## [14.2.15](https://github.com/atinc/ngx-tethys/compare/14.2.14...14.2.15) (2023-02-03)


### Bug Fixes

* **dot:** incorrect display when the attribute size is lg or xlg and the theme is outline #INFR-6240 ([fc61953](https://github.com/atinc/ngx-tethys/commit/fc6195396c00a434e359b72b0d4efa4541481587)), closes [#INFR-6240](https://github.com/atinc/ngx-tethys/issues/INFR-6240)
* **dropdown:** dropdown item in active can't change background when mouseover (#INFR-5285) ([#2510](https://github.com/atinc/ngx-tethys/issues/2510)) ([1d2791a](https://github.com/atinc/ngx-tethys/commit/1d2791a76b8ee0c7caa9a1f4491a8f9e4ec101d2)), closes [#INFR-5285](https://github.com/atinc/ngx-tethys/issues/INFR-5285)
* **upload:** update MIME_Map to fix accept types error #INFR-6281 ([2c8227e](https://github.com/atinc/ngx-tethys/commit/2c8227ecfe49926898c974050d956a42b29040f9)), closes [#INFR-6281](https://github.com/atinc/ngx-tethys/issues/INFR-6281)


### Features

* **form:** add more way to validate form #INFR-2972 ([#2370](https://github.com/atinc/ngx-tethys/issues/2370)) ([7937de3](https://github.com/atinc/ngx-tethys/commit/7937de36ba22f13d3e63b26f5720546d67bfd501)), closes [#INFR-2972](https://github.com/atinc/ngx-tethys/issues/INFR-2972)
* send message and merge after pub  #INFR-6280 ([1bbbd0f](https://github.com/atinc/ngx-tethys/commit/1bbbd0fdfb734371ae28be0d6cdda1d7c8ce36b9)), closes [#INFR-6280](https://github.com/atinc/ngx-tethys/issues/INFR-6280)



## [14.2.14](https://github.com/atinc/ngx-tethys/compare/14.2.13...14.2.14) (2023-01-20)


### Bug Fixes

* **DatePicker:** update year、week range style #INFR-6159 ([#2488](https://github.com/atinc/ngx-tethys/issues/2488)) ([e7d7845](https://github.com/atinc/ngx-tethys/commit/e7d7845c9131400d55bd8da9100c4fa34e8e6b6d)), closes [#INFR-6159](https://github.com/atinc/ngx-tethys/issues/INFR-6159)
* **tree-select:** fix prefix icon color of multiple option list of tree-select(#INFR-6234) ([#2495](https://github.com/atinc/ngx-tethys/issues/2495)) ([82ca864](https://github.com/atinc/ngx-tethys/commit/82ca86402263d90c832c9ecd5b8a28e7962bd0e9)), closes [#INFR-6234](https://github.com/atinc/ngx-tethys/issues/INFR-6234)
* **Upload:** fix NG0203 error for inject()  #INFR-6222 ([d89aff9](https://github.com/atinc/ngx-tethys/commit/d89aff9c8f7cc43e38b51d819449fa6285457074)), closes [#INFR-6222](https://github.com/atinc/ngx-tethys/issues/INFR-6222)


### Features

* **input:** add textarea[thyInput] selector to ThyInputDirective ([e0c593d](https://github.com/atinc/ngx-tethys/commit/e0c593d9c319c5f955ed33853f334534cc6b20f0))



## [14.2.13](https://github.com/atinc/ngx-tethys/compare/14.2.12...14.2.13) (2023-01-16)


### Features

* **upload:** enhance compatibility of office document when upload file #INFR-6199 ([#2490](https://github.com/atinc/ngx-tethys/issues/2490)) ([c1a0aab](https://github.com/atinc/ngx-tethys/commit/c1a0aab57ad8222be25537cb1a3d4cd839c81a8f)), closes [#INFR-6199](https://github.com/atinc/ngx-tethys/issues/INFR-6199)



## [14.2.12](https://github.com/atinc/ngx-tethys/compare/14.2.11...14.2.12) (2023-01-13)


### Bug Fixes

* **select:** thy-custom-select support auto focus when option change z/#INFR-6122 ([#2485](https://github.com/atinc/ngx-tethys/issues/2485)) ([3fafeee](https://github.com/atinc/ngx-tethys/commit/3fafeee400f7fa954c9f884c8b3ee2a618d21cd2)), closes [z/#INFR-6122](https://github.com/atinc/ngx-tethys/issues/INFR-6122)



## [14.2.11](https://github.com/atinc/ngx-tethys/compare/14.2.10...14.2.11) (2023-01-11)


### Bug Fixes

* **cascader:** display labels correctly when get options by async way #INFR-6044 ([#2477](https://github.com/atinc/ngx-tethys/issues/2477)) ([e7d1658](https://github.com/atinc/ngx-tethys/commit/e7d165823d90bc4b538b88b0cfc2156ed9e44b9a)), closes [#INFR-6044](https://github.com/atinc/ngx-tethys/issues/INFR-6044)
* **color-picker:** hide transparentColorSelect change style paddingTop [@wanghuan](https://github.com/wanghuan) ([#2475](https://github.com/atinc/ngx-tethys/issues/2475)) ([a897ebf](https://github.com/atinc/ngx-tethys/commit/a897ebf06ed03832856ac657394d6c3e635e45e4))
* **option:** #INFR-6128 fix icon color error when option is active [@haifeng](https://github.com/haifeng) ([#2480](https://github.com/atinc/ngx-tethys/issues/2480)) ([6a3a9a9](https://github.com/atinc/ngx-tethys/commit/6a3a9a945b252d18bb637a4c8cd57399e7eeadd7))
* **table:** remove thy-grid selector #INFR-6124 ([#2479](https://github.com/atinc/ngx-tethys/issues/2479)) ([fe1b5a8](https://github.com/atinc/ngx-tethys/commit/fe1b5a870521252d741e0b5ffc7b203ee07160b1)), closes [#INFR-6124](https://github.com/atinc/ngx-tethys/issues/INFR-6124)


### Features

* **image:** support ThyImageService support downloadClicked$ #INFR-6120 ([1d25519](https://github.com/atinc/ngx-tethys/commit/1d25519f3496a21c5fe29fbae4c6e5527ed695c6)), closes [#INFR-6120](https://github.com/atinc/ngx-tethys/issues/INFR-6120)
* **progress:** progress support circle mode #INFR-5999  ([0f6f241](https://github.com/atinc/ngx-tethys/commit/0f6f2413d621eb5733d5ddbf4a22aebfb68d2bf0)), closes [#INFR-5999](https://github.com/atinc/ngx-tethys/issues/INFR-5999)
* **select:** custom-select 支持自定义 origin #INFR-5676 ([#2476](https://github.com/atinc/ngx-tethys/issues/2476)) ([eff0157](https://github.com/atinc/ngx-tethys/commit/eff01577899d571f2ab44a35ce3adb01aaeef2f7)), closes [#INFR-5676](https://github.com/atinc/ngx-tethys/issues/INFR-5676)


### BREAKING CHANGES

* **table:** table thy-grid selector deprecated



## [14.2.10](https://github.com/atinc/ngx-tethys/compare/14.2.9...14.2.10) (2023-01-06)


### Bug Fixes

* **cascader:** return right data when use multi mode #INFR-6044 ([#2469](https://github.com/atinc/ngx-tethys/issues/2469)) ([eb78eef](https://github.com/atinc/ngx-tethys/commit/eb78eef47785c277429db872a29ec5df929b9d39)), closes [#INFR-6044](https://github.com/atinc/ngx-tethys/issues/INFR-6044)
* **property:** add flex: auto for thy-property-item-content-text ([017a943](https://github.com/atinc/ngx-tethys/commit/017a9434b998fbe1ccfede1af0fd4231530c4a7e))


### Features

* **cascader:** change emptyStateText #INFR-6037 ([#2467](https://github.com/atinc/ngx-tethys/issues/2467)) ([d2d2cbb](https://github.com/atinc/ngx-tethys/commit/d2d2cbb7e5eff58be336a000fc281bece23f5386)), closes [#INFR-6037](https://github.com/atinc/ngx-tethys/issues/INFR-6037)
* **select:** change emptyStateText #INFR-6041 ([#2468](https://github.com/atinc/ngx-tethys/issues/2468)) ([2b2225d](https://github.com/atinc/ngx-tethys/commit/2b2225d0387ed51ddc5c41a7d5fb14df19d146b8)), closes [#INFR-6041](https://github.com/atinc/ngx-tethys/issues/INFR-6041)



## [14.2.9](https://github.com/atinc/ngx-tethys/compare/14.2.8...14.2.9) (2023-01-05)


### Bug Fixes

* **cdk:** hotkey callback run in ngZone #INFR-5955 ([b4ce272](https://github.com/atinc/ngx-tethys/commit/b4ce272cfab3febc280da27c2877e8e27e35d9b2)), closes [#INFR-5955](https://github.com/atinc/ngx-tethys/issues/INFR-5955)
* **date-picker:** update type of thy-nav from secondary to pulled and update nav height to 40px #INFR-6026 ([60a3adb](https://github.com/atinc/ngx-tethys/commit/60a3adbbd366f6dd9201ee2ed8fbdc7691218d7f)), closes [#INFR-6026](https://github.com/atinc/ngx-tethys/issues/INFR-6026)
* **select:** update option default color from  $secondary to $body-color([#333](https://github.com/atinc/ngx-tethys/issues/333)) #INFR-5908 ([#2459](https://github.com/atinc/ngx-tethys/issues/2459)) ([a5f8889](https://github.com/atinc/ngx-tethys/commit/a5f88897749e0a9282c4d527cc4c8c334c28040a)), closes [#INFR-5908](https://github.com/atinc/ngx-tethys/issues/INFR-5908)
* **tree:** click select node when node is not disabled #INFR-6039 ([#2466](https://github.com/atinc/ngx-tethys/issues/2466)) ([6d1ff40](https://github.com/atinc/ngx-tethys/commit/6d1ff403e4c0fafd4022950af693d38780d96987)), closes [#INFR-6039](https://github.com/atinc/ngx-tethys/issues/INFR-6039)


### Features

* **cdk:** add behaviors module contains useAction and useAsync behaviors ([39fa4bd](https://github.com/atinc/ngx-tethys/commit/39fa4bdb2f999ceaac2a9ba5b2acd42cd03ba24b))
* **grid:** add thy-grid and thy-grid-item component #INFR-4684 ([#2389](https://github.com/atinc/ngx-tethys/issues/2389)) ([c4d8fa0](https://github.com/atinc/ngx-tethys/commit/c4d8fa0fee33139e0314004c99665f9b716974fd)), closes [#INFR-4684](https://github.com/atinc/ngx-tethys/issues/INFR-4684)
* **typography:** update icon color of thy-text to $gray-600 ([#999](https://github.com/atinc/ngx-tethys/issues/999)) [#2461](https://github.com/atinc/ngx-tethys/issues/2461) ([#2462](https://github.com/atinc/ngx-tethys/issues/2462)) ([96ff449](https://github.com/atinc/ngx-tethys/commit/96ff4494f9a73a50eaf7a2f10634f9279a7e1e7c))
* **Util:**  add date function at util #INFR-5953 ([#2456](https://github.com/atinc/ngx-tethys/issues/2456)) ([e92564c](https://github.com/atinc/ngx-tethys/commit/e92564c09099551da56d32f74c8c9a87e54848cc)), closes [#INFR-5953](https://github.com/atinc/ngx-tethys/issues/INFR-5953)



## [14.2.8](https://github.com/atinc/ngx-tethys/compare/14.2.7...14.2.8) (2022-12-29)


### Features

* **color-picker:** add thyPresetColors #INFR-5921 ([#2452](https://github.com/atinc/ngx-tethys/issues/2452)) ([9a08aa7](https://github.com/atinc/ngx-tethys/commit/9a08aa72c8521c36a7130d2e8907dc81f4f17b7e)), closes [#INFR-5921](https://github.com/atinc/ngx-tethys/issues/INFR-5921)
* **icon:** support standalone component and replace UpdateHostClassService with useHostRenderer ([#2453](https://github.com/atinc/ngx-tethys/issues/2453)) ([cc34def](https://github.com/atinc/ngx-tethys/commit/cc34defbed4d4623bd4cb96b498a2eecf6d93858))
* **message:** add message component #INFR-4779 ([#2446](https://github.com/atinc/ngx-tethys/issues/2446)) ([1d9d0a6](https://github.com/atinc/ngx-tethys/commit/1d9d0a6c236aa515022131a914b6e40881a94979)), closes [#INFR-4779](https://github.com/atinc/ngx-tethys/issues/INFR-4779)
* **shared:** only update changed property of context for thyViewOutlet #INFR-5923 ([#2451](https://github.com/atinc/ngx-tethys/issues/2451)) ([43c22e0](https://github.com/atinc/ngx-tethys/commit/43c22e0d5d9439c820f99a5d0bad55d5910fc677)), closes [#INFR-5923](https://github.com/atinc/ngx-tethys/issues/INFR-5923)



## [14.2.7](https://github.com/atinc/ngx-tethys/compare/14.2.6...14.2.7) (2022-12-28)


### Bug Fixes

* **cdk:** remove hotkey conflict logic and don't call hotkey event when active element is form control ([5568e52](https://github.com/atinc/ngx-tethys/commit/5568e52d46d8a54e7497f780b9cb3b9abe8b2dc0))
* **layout:** custom collapsed template support hotkey #INFR-5804 ([cfbc8a1](https://github.com/atinc/ngx-tethys/commit/cfbc8a16ef87ac628cea3ae4c211c84c58e960ae)), closes [#INFR-5804](https://github.com/atinc/ngx-tethys/issues/INFR-5804)
* **list:** replace $hover-bg-color $gray-80 to $gray-100 #INFR-5885 ([282ba9b](https://github.com/atinc/ngx-tethys/commit/282ba9ba1e736453df270dd76bc891328053940c)), closes [#INFR-5885](https://github.com/atinc/ngx-tethys/issues/INFR-5885)
* **select:** get right width #INFR-5909 ([#2449](https://github.com/atinc/ngx-tethys/issues/2449)) ([b40667e](https://github.com/atinc/ngx-tethys/commit/b40667e3356eb52047d1b364af80d7e20d4bb0e2)), closes [#INFR-5909](https://github.com/atinc/ngx-tethys/issues/INFR-5909)
* time picker disable style #INFR-5888 ([#2448](https://github.com/atinc/ngx-tethys/issues/2448)) ([b748917](https://github.com/atinc/ngx-tethys/commit/b748917368378dcf40640d6f0cec01f91b860de6)), closes [#INFR-5888](https://github.com/atinc/ngx-tethys/issues/INFR-5888)



## [14.2.6](https://github.com/atinc/ngx-tethys/compare/14.2.5...14.2.6) (2022-12-16)


### Bug Fixes

* **select:** 多选清除按钮修改间距 #INFR-5731 ([4d580a4](https://github.com/atinc/ngx-tethys/commit/4d580a48f443df86f925933ca6bba16d2f71f153)), closes [#INFR-5731](https://github.com/atinc/ngx-tethys/issues/INFR-5731)


### Features

* **cdk:** add isMacPlatform ([243185e](https://github.com/atinc/ngx-tethys/commit/243185e75c84b93afc9a8e68959a4664ffd59477))
* **shared:** add thyViewOutlet directive render component or template and add docs for shared #INFR-5803 ([#2440](https://github.com/atinc/ngx-tethys/issues/2440)) ([033e9b5](https://github.com/atinc/ngx-tethys/commit/033e9b56ae2af30d772db159d2f7a6bc983787f9)), closes [#INFR-5803](https://github.com/atinc/ngx-tethys/issues/INFR-5803)



## [14.2.5](https://github.com/atinc/ngx-tethys/compare/14.2.4...14.2.5) (2022-12-16)


### Bug Fixes

* **input:** thy-input-count 初始化没有赋值设置为 0，验证失败提示信息校验跑版，禁用样式跑版 #INFR-5574 ([#2435](https://github.com/atinc/ngx-tethys/issues/2435)) ([1900130](https://github.com/atinc/ngx-tethys/commit/19001309f767751f3d5cc87541c3907a5a20907e)), closes [#INFR-5574](https://github.com/atinc/ngx-tethys/issues/INFR-5574)
* **select:** set padding-right: 8px when display max-tag-count-choice tag #INFR-5781 ([d3e481c](https://github.com/atinc/ngx-tethys/commit/d3e481c04ca11459052a435b63e990d81f6c60bd)), closes [#INFR-5781](https://github.com/atinc/ngx-tethys/issues/INFR-5781)


### Features

* **arrow-switcher:** tooltip is supported in lite themes #INFR-5735 ([1fbdaae](https://github.com/atinc/ngx-tethys/commit/1fbdaaeca83aa1829dbb277347045f9b4c12a035)), closes [#INFR-5735](https://github.com/atinc/ngx-tethys/issues/INFR-5735)



## [14.2.4](https://github.com/atinc/ngx-tethys/compare/14.2.3...14.2.4) (2022-12-15)


### Features

* **color-picker:** export DEFAULT_COLORS #INFR-5748 ([#2433](https://github.com/atinc/ngx-tethys/issues/2433)) ([04ae626](https://github.com/atinc/ngx-tethys/commit/04ae626c5e2e7ac13a8bd072e717ded9d9c38a93)), closes [#INFR-5748](https://github.com/atinc/ngx-tethys/issues/INFR-5748)
* **dot:** support xlg size 18px  #INFR-5749 ([#2432](https://github.com/atinc/ngx-tethys/issues/2432)) ([6efbfa4](https://github.com/atinc/ngx-tethys/commit/6efbfa4d648afcffa688ff177dc287266bcf547e)), closes [#INFR-5749](https://github.com/atinc/ngx-tethys/issues/INFR-5749)
* **select:** 多选清除所选项新的交互 #INFR-5731 ([#2428](https://github.com/atinc/ngx-tethys/issues/2428)) ([e45ffc8](https://github.com/atinc/ngx-tethys/commit/e45ffc8adaada6484b58efac9f7a8e10d1e073d0)), closes [#INFR-5731](https://github.com/atinc/ngx-tethys/issues/INFR-5731) [#INFR-5731](https://github.com/atinc/ngx-tethys/issues/INFR-5731)
* **select:** remove group-name background #INFR-5692 ([37a97fe](https://github.com/atinc/ngx-tethys/commit/37a97fe978c8cba19e8dd61d63f108aa0cdaf36b)), closes [#INFR-5692](https://github.com/atinc/ngx-tethys/issues/INFR-5692)



## [14.2.3](https://github.com/atinc/ngx-tethys/compare/14.2.2...14.2.3) (2022-12-13)


### Bug Fixes

* **dialog:** add style for dialog use setting siderbar header zd/#INFR-5686 ([#2425](https://github.com/atinc/ngx-tethys/issues/2425)) ([abfa03c](https://github.com/atinc/ngx-tethys/commit/abfa03c91f221ee21fc7d57d420173f8e1cb6eb2)), closes [zd/#INFR-5686](https://github.com/atinc/ngx-tethys/issues/INFR-5686)


### Features

* **cdk:** add Ids, IdOrIds types and export these from @tethys/cdk/immutable in types and remove unused types #INFR-5683 ([#2424](https://github.com/atinc/ngx-tethys/issues/2424)) ([a53dec2](https://github.com/atinc/ngx-tethys/commit/a53dec272212771f5e7f14f8d6ee4ca0e7d28f61)), closes [#INFR-5683](https://github.com/atinc/ngx-tethys/issues/INFR-5683)



## [14.2.2](https://github.com/atinc/ngx-tethys/compare/14.2.1...14.2.2) (2022-12-09)


### Bug Fixes

* **git:** auto merge retry 20 sleep 1m ([#2420](https://github.com/atinc/ngx-tethys/issues/2420)) ([a399ec1](https://github.com/atinc/ngx-tethys/commit/a399ec17f122063e645dc296b075918a8f64982f))
* **input:** add display inline-flex for input-group-prefix and replace UpdateHostClassService with useHostRenderer for button ([7ccc291](https://github.com/atinc/ngx-tethys/commit/7ccc291b939b66bff3bc7c14067fbf60eecd0e98))
* **table:** adjust the style of border-radius #INFR-5673 ([#2421](https://github.com/atinc/ngx-tethys/issues/2421)) ([4189d9d](https://github.com/atinc/ngx-tethys/commit/4189d9d278a8fed3f16c5e53e0677b724ab6fa0c)), closes [#INFR-5673](https://github.com/atinc/ngx-tethys/issues/INFR-5673)



## [14.2.1](https://github.com/atinc/ngx-tethys/compare/14.2.0...14.2.1) (2022-12-08)


### Bug Fixes

* set thy-table-fixed-header box shadow #INFR-5644 ([67bfa9f](https://github.com/atinc/ngx-tethys/commit/67bfa9f80ec9981214868f71acc19c414cd94855)), closes [#INFR-5644](https://github.com/atinc/ngx-tethys/issues/INFR-5644)


### Features

* **git:** auto approve before merge pr  ([33ad470](https://github.com/atinc/ngx-tethys/commit/33ad470fec98093952f3e822aa12957fa295e056))
* **table:** add table-skeleton #INFR-5315 ([#2415](https://github.com/atinc/ngx-tethys/issues/2415)) ([ec67bc4](https://github.com/atinc/ngx-tethys/commit/ec67bc43bfff0da382b612926f753298910870df)), closes [#INFR-5315](https://github.com/atinc/ngx-tethys/issues/INFR-5315)



# [14.2.0](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.6...14.2.0) (2022-12-08)


### Bug Fixes

* run action when completed ([e2f4c34](https://github.com/atinc/ngx-tethys/commit/e2f4c3471672df81023d596916968f8e9e6310c7))


### Features

* **cdk:** add object-producer to immutable #INFR-5526 ([01429e9](https://github.com/atinc/ngx-tethys/commit/01429e95110b25882a41d3a710f5971b21c34e72)), closes [#INFR-5526](https://github.com/atinc/ngx-tethys/issues/INFR-5526)
* **cdk:** add ThyHotkeyDirective and  ThyHotkeyDispatcher #INFR-5572 ([#2388](https://github.com/atinc/ngx-tethys/issues/2388)) ([1b9d78d](https://github.com/atinc/ngx-tethys/commit/1b9d78d19bdf45d05e6210bdb6f9a2f0dfb6b421)), closes [#INFR-5572](https://github.com/atinc/ngx-tethys/issues/INFR-5572)
* **cdk:** call last hotkey event when hotkey conflicted #INFR-5572 ([#2410](https://github.com/atinc/ngx-tethys/issues/2410)) ([9e042aa](https://github.com/atinc/ngx-tethys/commit/9e042aa04776c4211c7bae14bce045fc5ddc1156)), closes [#INFR-5572](https://github.com/atinc/ngx-tethys/issues/INFR-5572)
* **layout:** sidebar collapsible support hotkey #INFR-5570 ([59b7245](https://github.com/atinc/ngx-tethys/commit/59b7245ef43cddcc0e7fe68ea36485cd891b9561)), closes [#INFR-5570](https://github.com/atinc/ngx-tethys/issues/INFR-5570)
* **mention:** support contenteditable #INFR-175 ([#2382](https://github.com/atinc/ngx-tethys/issues/2382)) ([991a8de](https://github.com/atinc/ngx-tethys/commit/991a8de26133c65100e96f6d9f65301d72523b3b)), closes [#INFR-175](https://github.com/atinc/ngx-tethys/issues/INFR-175)
* **nav:** nav-item-icon-color change to [#999](https://github.com/atinc/ngx-tethys/issues/999) #INFR-5560 ([3667b05](https://github.com/atinc/ngx-tethys/commit/3667b057268393515db18e3b92e4602ef0009652)), closes [#INFR-5560](https://github.com/atinc/ngx-tethys/issues/INFR-5560)



# [14.2.0-next.6](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.5...14.2.0-next.6) (2022-11-30)


### Documentation

* **cascader:** document optimization #INFR-5085 ([#2295](https://github.com/atinc/ngx-tethys/issues/2295)) ([499192e](https://github.com/atinc/ngx-tethys/commit/499192eeb2f7b22410289e38276a09aee308cd1f)), closes [#INFR-5085](https://github.com/atinc/ngx-tethys/issues/INFR-5085)


### Features

* add workflow action about auto merge and pub ([#2373](https://github.com/atinc/ngx-tethys/issues/2373)) ([fb4590e](https://github.com/atinc/ngx-tethys/commit/fb4590e1e3cfac871b25df52d5b3b1ffe639882c))
* **notify:** notify content can be component or templateRef #INFR-1250 ([#2374](https://github.com/atinc/ngx-tethys/issues/2374)) ([ae6ac58](https://github.com/atinc/ngx-tethys/commit/ae6ac5897875a29f7eda564dd978e5faf26a61d6)), closes [#INFR-1250](https://github.com/atinc/ngx-tethys/issues/INFR-1250)
* **notify:** notify support contentInitialState when content  is templateRef or component #INFR-1250 ([#2378](https://github.com/atinc/ngx-tethys/issues/2378)) ([7da1ee4](https://github.com/atinc/ngx-tethys/commit/7da1ee4a1900c32a3881ed92ea77b3aef74a33cd)), closes [#INFR-1250](https://github.com/atinc/ngx-tethys/issues/INFR-1250)


### BREAKING CHANGES

* **cascader:** disabled change to thyDisabled, CascaderOption change to ThyCascaderOption



# [14.2.0-next.5](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.4...14.2.0-next.5) (2022-11-28)


### Bug Fixes

* **nav:** resize item should update ink bar width #INFR-5481 ([#2369](https://github.com/atinc/ngx-tethys/issues/2369)) ([29cc792](https://github.com/atinc/ngx-tethys/commit/29cc7924cc11cd149095f93635ea4fcd94b51408)), closes [#INFR-5481](https://github.com/atinc/ngx-tethys/issues/INFR-5481)



# [14.2.0-next.4](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.3...14.2.0-next.4) (2022-11-25)


### Bug Fixes

* **color-picker:** support simultaneous display #INFR-5439 ([#2364](https://github.com/atinc/ngx-tethys/issues/2364)) ([341dbce](https://github.com/atinc/ngx-tethys/commit/341dbce45e149713d5adf71124398e7e6386ffd8)), closes [#INFR-5439](https://github.com/atinc/ngx-tethys/issues/INFR-5439)
* **nav:** show ink bar when use routerLinkActive #INFR-5455 ([#2363](https://github.com/atinc/ngx-tethys/issues/2363)) ([d3e3c9a](https://github.com/atinc/ngx-tethys/commit/d3e3c9a5ca2ae48ec06a84f91c18febef61f743c)), closes [#INFR-5455](https://github.com/atinc/ngx-tethys/issues/INFR-5455)
* **select:** change multi select  choices gap from 6px to 4px #INFR-5445 ([f3afbf0](https://github.com/atinc/ngx-tethys/commit/f3afbf07685326540943c7dfa3b53b3e4083dcb5)), closes [#INFR-5445](https://github.com/atinc/ngx-tethys/issues/INFR-5445)
* **select:** change multi select  choices gap from 6px to 4px #INFR-5445 ([9355a97](https://github.com/atinc/ngx-tethys/commit/9355a973584e36eddde2a324b6250e55d3c2aa42)), closes [#INFR-5445](https://github.com/atinc/ngx-tethys/issues/INFR-5445)
* **slide:** merge defaultConfig & open config to check disableCloseLatest #INFR-5263 ([#2362](https://github.com/atinc/ngx-tethys/issues/2362)) ([509aa66](https://github.com/atinc/ngx-tethys/commit/509aa662b759be072b7b34c4865df9ea53d106cf)), closes [#INFR-5263](https://github.com/atinc/ngx-tethys/issues/INFR-5263)



# [14.2.0-next.3](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.2...14.2.0-next.3) (2022-11-23)


### Bug Fixes

* **nav:** show ink bar when use routerLinkActive #INFR-5455 ([#2360](https://github.com/atinc/ngx-tethys/issues/2360)) ([365eb7b](https://github.com/atinc/ngx-tethys/commit/365eb7b4be12aea682bcdade340068cc838b2281)), closes [#INFR-5455](https://github.com/atinc/ngx-tethys/issues/INFR-5455)


### Features

* **slide:** slide add disableCloseLatest support disable auto close latest slideRef #INFR-5263 ([81d02de](https://github.com/atinc/ngx-tethys/commit/81d02de9c225250075d6b23eef3b6daef99ac98f)), closes [#INFR-5263](https://github.com/atinc/ngx-tethys/issues/INFR-5263)
* **table:** add border-radius for table-bordered #INFR-5441 ([#2358](https://github.com/atinc/ngx-tethys/issues/2358)) ([7ca4e98](https://github.com/atinc/ngx-tethys/commit/7ca4e981c5c4d0ad20bc77be7ee487fa0bb1db81)), closes [#INFR-5441](https://github.com/atinc/ngx-tethys/issues/INFR-5441)



# [14.2.0-next.2](https://github.com/atinc/ngx-tethys/compare/14.2.0-next.1...14.2.0-next.2) (2022-11-22)


### Bug Fixes

* **progress:**  add left border-radius in safari #INFR-5407 ([bfa6bc2](https://github.com/atinc/ngx-tethys/commit/bfa6bc22ecd9456a3323af5dd7e6307b0f177630)), closes [#INFR-5407](https://github.com/atinc/ngx-tethys/issues/INFR-5407)
* **property:** add min-width to 0px for thy-property-item, content and  content-text ([6659107](https://github.com/atinc/ngx-tethys/commit/6659107a5d13a3cd1e2e5a25b471104d96b21602))
* **resizable:** update cursor of handle to row-resize and col-resize #INFR-5291 ([8ae0edb](https://github.com/atinc/ngx-tethys/commit/8ae0edb6134c24f93ae69d3b01c493d56d2339d0)), closes [#INFR-5291](https://github.com/atinc/ngx-tethys/issues/INFR-5291)
* **skeleton:** adjust the style to compatible safari #INFR-5083 ([#2328](https://github.com/atinc/ngx-tethys/issues/2328)) ([123a6d0](https://github.com/atinc/ngx-tethys/commit/123a6d0f43a2fa9d29171fd661b48fcd20029d71)), closes [#INFR-5083](https://github.com/atinc/ngx-tethys/issues/INFR-5083)
* **table:** not render td default node when defaultText is empty ([c002573](https://github.com/atinc/ngx-tethys/commit/c0025736820e8fa61525ce1e68c938e449efc55a))
* **table:** remove operation-links td padding #INFR-5338 ([#2340](https://github.com/atinc/ngx-tethys/issues/2340)) ([d808cd3](https://github.com/atinc/ngx-tethys/commit/d808cd32ea804d02e76c104e389298af66f70fc1)), closes [#INFR-5338](https://github.com/atinc/ngx-tethys/issues/INFR-5338)
* **tabs:** show right activeTab when use activeTabId #INFR-5430 ([#2352](https://github.com/atinc/ngx-tethys/issues/2352)) ([c16ac4d](https://github.com/atinc/ngx-tethys/commit/c16ac4d7d2d106154ed34ffdfeff65ab6b1c02d1)), closes [#INFR-5430](https://github.com/atinc/ngx-tethys/issues/INFR-5430)
* **tooltip:**  fix tooltip arrow position #INFR-5310 ([161bc0b](https://github.com/atinc/ngx-tethys/commit/161bc0b05e923bd6bdfb32642eee0d71f360e44a)), closes [#INFR-5310](https://github.com/atinc/ngx-tethys/issues/INFR-5310)


### Features

* **button:** fix icon size to '12px 'when thyButtonIcon size is 'xs'.(#INFR-5336) ([#2342](https://github.com/atinc/ngx-tethys/issues/2342)) ([2134bb6](https://github.com/atinc/ngx-tethys/commit/2134bb6cec57f2c817be2835d60443c63715820f)), closes [#INFR-5336](https://github.com/atinc/ngx-tethys/issues/INFR-5336)
* **dropdown:** add thyShowDelay and thyHideDelay property for dropdown directive, default 100ms ([84560aa](https://github.com/atinc/ngx-tethys/commit/84560aa015b6425d13056fd588d010d9967e7e31))
* **guider:** guider step support multi targets #INFR-5201 ([#2327](https://github.com/atinc/ngx-tethys/issues/2327)) ([2367039](https://github.com/atinc/ngx-tethys/commit/23670391b6aa9023cf5ef2c77096a4023c63a7b0)), closes [#INFR-5201](https://github.com/atinc/ngx-tethys/issues/INFR-5201)
* **nav:** add animation for pulled and tabs types #INFR-5203 ([#2339](https://github.com/atinc/ngx-tethys/issues/2339)) ([51b91c9](https://github.com/atinc/ngx-tethys/commit/51b91c933477e71bf8b1d0444eee6477c2210fe6)), closes [#INFR-5203](https://github.com/atinc/ngx-tethys/issues/INFR-5203)
* **popover:** apply the base class's thyShowDelay and thyHidenDelay properties ([4ebf47e](https://github.com/atinc/ngx-tethys/commit/4ebf47eb1384165ad027f53839ee4e21428e3ade))



# [14.2.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.1.8...14.2.0-next.1) (2022-11-14)


### Bug Fixes

* **tag:** thyColor switch between theme color and custom color can't effect #INFR-5267 ([d5d6fd1](https://github.com/atinc/ngx-tethys/commit/d5d6fd11557e88b66021c59c965f062c83447621)), closes [#INFR-5267](https://github.com/atinc/ngx-tethys/issues/INFR-5267)


### Features

* **anchor:** rename thyLink to thyAnchorLink and fix docs(#INFR-5149) ([#2312](https://github.com/atinc/ngx-tethys/issues/2312)) ([8551e40](https://github.com/atinc/ngx-tethys/commit/8551e4003338a9f43c284d64014ea236303cf4d7)), closes [#INFR-5149](https://github.com/atinc/ngx-tethys/issues/INFR-5149)
* **color-picker:** add default color optional #INFR-5146 ([#2319](https://github.com/atinc/ngx-tethys/issues/2319)) ([f8ef908](https://github.com/atinc/ngx-tethys/commit/f8ef908a9fffa8f487baacbe30b90d578603f4a1)), closes [#INFR-5146](https://github.com/atinc/ngx-tethys/issues/INFR-5146)
* **icon:** icon-registry add icon support untrusted url  #INFR-5266 ([0b302b7](https://github.com/atinc/ngx-tethys/commit/0b302b73e9a545c4d0a85832f1401394616c9743)), closes [#INFR-5266](https://github.com/atinc/ngx-tethys/issues/INFR-5266)
* **input:** add thy-input-count statistical input length #INFR-5028 ([#2315](https://github.com/atinc/ngx-tethys/issues/2315)) ([0d9885e](https://github.com/atinc/ngx-tethys/commit/0d9885ea146319029dee2cb4cc74ab0180ba2ef0)), closes [#INFR-5028](https://github.com/atinc/ngx-tethys/issues/INFR-5028)
* **property:** add property item operation #INFR-5240 ([#2317](https://github.com/atinc/ngx-tethys/issues/2317)) ([b425fd6](https://github.com/atinc/ngx-tethys/commit/b425fd6dd264793d99c8e7ae40074a1f2db7ea1d)), closes [#INFR-5240](https://github.com/atinc/ngx-tethys/issues/INFR-5240)
* **property:** add thyOperationTrigger for thy-property-item #INFR-5240 ([f625759](https://github.com/atinc/ngx-tethys/commit/f625759e1169eda26da38c1cfc5a83b2f4aaf8d5)), closes [#INFR-5240](https://github.com/atinc/ngx-tethys/issues/INFR-5240)
* **property:** update label height to 32px and remove column padding use gap #INFR-5258 ([#2316](https://github.com/atinc/ngx-tethys/issues/2316)) ([7fa55cc](https://github.com/atinc/ngx-tethys/commit/7fa55ccd136428c45a4a0f0e8f4165991b370f0c)), closes [#INFR-5258](https://github.com/atinc/ngx-tethys/issues/INFR-5258)
* **tabs:** change 'thyActiveTab' type to 'string | number'(#INFR-5204) ([#2318](https://github.com/atinc/ngx-tethys/issues/2318)) ([a26ae3c](https://github.com/atinc/ngx-tethys/commit/a26ae3cbdc0a5fb3e7c0feb1438349ba344286e7)), closes [#INFR-5204](https://github.com/atinc/ngx-tethys/issues/INFR-5204)


### BREAKING CHANGES

* **property:** - update label height 32px, remove margin-bottom for vertical
- remove label width 100px for vertical, update  display to inline-grid



# [14.2.0-next.0](https://github.com/atinc/ngx-tethys/compare/14.1.8...14.2.0-next.0) (2022-11-10)


### Features

* **anchor:** rename thyLink to thyAnchorLink and fix docs(#INFR-5149) ([#2312](https://github.com/atinc/ngx-tethys/issues/2312)) ([8551e40](https://github.com/atinc/ngx-tethys/commit/8551e4003338a9f43c284d64014ea236303cf4d7)), closes [#INFR-5149](https://github.com/atinc/ngx-tethys/issues/INFR-5149)
* **input:** add thy-input-count statistical input length #INFR-5028 ([#2315](https://github.com/atinc/ngx-tethys/issues/2315)) ([0d9885e](https://github.com/atinc/ngx-tethys/commit/0d9885ea146319029dee2cb4cc74ab0180ba2ef0)), closes [#INFR-5028](https://github.com/atinc/ngx-tethys/issues/INFR-5028)
* **property:** add property item operation #INFR-5240 ([#2317](https://github.com/atinc/ngx-tethys/issues/2317)) ([b425fd6](https://github.com/atinc/ngx-tethys/commit/b425fd6dd264793d99c8e7ae40074a1f2db7ea1d)), closes [#INFR-5240](https://github.com/atinc/ngx-tethys/issues/INFR-5240)
* **property:** add thyOperationTrigger for thy-property-item #INFR-5240 ([f625759](https://github.com/atinc/ngx-tethys/commit/f625759e1169eda26da38c1cfc5a83b2f4aaf8d5)), closes [#INFR-5240](https://github.com/atinc/ngx-tethys/issues/INFR-5240)
* **property:** update label height to 32px and remove column padding use gap #INFR-5258 ([#2316](https://github.com/atinc/ngx-tethys/issues/2316)) ([7fa55cc](https://github.com/atinc/ngx-tethys/commit/7fa55ccd136428c45a4a0f0e8f4165991b370f0c)), closes [#INFR-5258](https://github.com/atinc/ngx-tethys/issues/INFR-5258)


### BREAKING CHANGES

* **property:** - update label height 32px, remove margin-bottom for vertical
- remove label width 100px for vertical, update  display to inline-grid



## [14.1.8](https://github.com/atinc/ngx-tethys/compare/14.1.7...14.1.8) (2022-11-09)


### Bug Fixes

* **color-picker:**  clicking showMoreColor button do not close popove… ([#2303](https://github.com/atinc/ngx-tethys/issues/2303)) ([315b42a](https://github.com/atinc/ngx-tethys/commit/315b42abfc693daeaba07a4e0ce4dc909f6187f9))


### Features

* **cascader:** change option hover style bg color to $gray-100 #INFR-5072 ([#2292](https://github.com/atinc/ngx-tethys/issues/2292)) ([8d37fa1](https://github.com/atinc/ngx-tethys/commit/8d37fa10015309ed598705d6b10fe528b69e1fdf)), closes [#INFR-5072](https://github.com/atinc/ngx-tethys/issues/INFR-5072)
* **mention:** change mention selection list padding #INFR-5251 ([#2309](https://github.com/atinc/ngx-tethys/issues/2309)) ([e58d9c1](https://github.com/atinc/ngx-tethys/commit/e58d9c12783ebc40e9895143e03ae917d831d5e9)), closes [#INFR-5251](https://github.com/atinc/ngx-tethys/issues/INFR-5251)


### Reverts

* **select:** revert select focus when options changed #INFR-5253 ([#2311](https://github.com/atinc/ngx-tethys/issues/2311)) ([5160955](https://github.com/atinc/ngx-tethys/commit/51609559222f61c4ae2ea1a484ce66bafff2c2ce)), closes [#INFR-5253](https://github.com/atinc/ngx-tethys/issues/INFR-5253)



## [14.1.7](https://github.com/atinc/ngx-tethys/compare/14.1.6...14.1.7) (2022-11-07)


### Features

* **empty:** update empty svg #INFR-5123 ([#2302](https://github.com/atinc/ngx-tethys/issues/2302)) ([d8d3faa](https://github.com/atinc/ngx-tethys/commit/d8d3faa76cb07acebe2ec3ddc73e619ada0514c3)), closes [#INFR-5123](https://github.com/atinc/ngx-tethys/issues/INFR-5123)
* **input:** add 'form-control-active' when thy-input-search focus #INFR-5167 ([72da6c4](https://github.com/atinc/ngx-tethys/commit/72da6c4d0e61edec9e67d9159110a03d2e903a59)), closes [#INFR-5167](https://github.com/atinc/ngx-tethys/issues/INFR-5167)



## [14.1.6](https://github.com/atinc/ngx-tethys/compare/14.1.5...14.1.6) (2022-10-28)


### Bug Fixes

* **cascader:** result not expect #INFR-5045 ([#2291](https://github.com/atinc/ngx-tethys/issues/2291)) ([5fb7a0c](https://github.com/atinc/ngx-tethys/commit/5fb7a0cefe9c65a15ab7859c54201c7ab4cbc017)), closes [#INFR-5045](https://github.com/atinc/ngx-tethys/issues/INFR-5045) [#INFR-5045](https://github.com/atinc/ngx-tethys/issues/INFR-5045)
* **resizable:** add markForCheck when rest resizing for OnPush Mode ([#2294](https://github.com/atinc/ngx-tethys/issues/2294)) ([e80fbb0](https://github.com/atinc/ngx-tethys/commit/e80fbb01a5c1f217d5a646ceb5aa7c3c735069f3))



## [14.1.5](https://github.com/atinc/ngx-tethys/compare/14.1.4...14.1.5) (2022-10-27)


### Bug Fixes

* **comment:** fixed the actions is displayed incorrectly in firefox #INFR-5042 ([387eb42](https://github.com/atinc/ngx-tethys/commit/387eb428cf3343908e5365d70183181c11fb31a3)), closes [#INFR-5042](https://github.com/atinc/ngx-tethys/issues/INFR-5042)
* **comment:** test case name optimization #INFR-4936 ([245ba34](https://github.com/atinc/ngx-tethys/commit/245ba34ca4e06d6717a4ec5e2aca86379a5afed2)), closes [#INFR-4936](https://github.com/atinc/ngx-tethys/issues/INFR-4936)
* **input-number:** trigger ngModel change on init only validated value is not equal ngModel and add error style #INFR-5065 ([f831bcb](https://github.com/atinc/ngx-tethys/commit/f831bcbed4ef8dffaf97a629a4c55b79ebb1d504)), closes [#INFR-5065](https://github.com/atinc/ngx-tethys/issues/INFR-5065)
* **resizable:** reset resizing in ngZone and update api docs to comment #INFR-4680 ([#2286](https://github.com/atinc/ngx-tethys/issues/2286)) ([7e96659](https://github.com/atinc/ngx-tethys/commit/7e96659ebcef1e60ed7f74d53208735658e2b3d4)), closes [#INFR-4680](https://github.com/atinc/ngx-tethys/issues/INFR-4680)
* **shared:** simplify use of thyStringOrTemplateOutlet directive when template is string #INFR-5049 ([923570a](https://github.com/atinc/ngx-tethys/commit/923570ada3f80a6db49b89f2f26a8379fdcba62a)), closes [#INFR-5049](https://github.com/atinc/ngx-tethys/issues/INFR-5049)


### Features

* **resizable:** support thyLine for thy-resize-handles and thy-resize-handle #INFR-5054 ([#2287](https://github.com/atinc/ngx-tethys/issues/2287)) ([3516fdd](https://github.com/atinc/ngx-tethys/commit/3516fdd53abe30fb690696d00d77a843ca0f7922)), closes [#INFR-5054](https://github.com/atinc/ngx-tethys/issues/INFR-5054)



## [14.1.4](https://github.com/atinc/ngx-tethys/compare/14.1.3...14.1.4) (2022-10-24)


### Bug Fixes

* **nav:** fix more-operation flashes when initialized #INFR-4986 ([#2280](https://github.com/atinc/ngx-tethys/issues/2280)) ([de5fdf2](https://github.com/atinc/ngx-tethys/commit/de5fdf2db68d691c459419eab40b4c0a7112fb50)), closes [#INFR-4986](https://github.com/atinc/ngx-tethys/issues/INFR-4986)



## [14.1.3](https://github.com/atinc/ngx-tethys/compare/14.1.2...14.1.3) (2022-10-24)


### Bug Fixes

* **image:** change download image method #INFR-5005 ([#2278](https://github.com/atinc/ngx-tethys/issues/2278)) ([597340a](https://github.com/atinc/ngx-tethys/commit/597340aa65cac26038082c262e628c217190b67f)), closes [#INFR-5005](https://github.com/atinc/ngx-tethys/issues/INFR-5005)



## [14.1.2](https://github.com/atinc/ngx-tethys/compare/14.1.1...14.1.2) (2022-10-21)


### Bug Fixes

* **comment:** not exported problem #INFR-4936 ([d443388](https://github.com/atinc/ngx-tethys/commit/d443388cca22ee74755fdb94a4836f1f5ee0ae15)), closes [#INFR-4936](https://github.com/atinc/ngx-tethys/issues/INFR-4936)
* **select:** fix init auto focus error #INFR-4994 ([#2274](https://github.com/atinc/ngx-tethys/issues/2274)) ([750b5bb](https://github.com/atinc/ngx-tethys/commit/750b5bb19fdc12c11fb74598931aa257eaa0dcf3)), closes [#INFR-4994](https://github.com/atinc/ngx-tethys/issues/INFR-4994)


### Features

* **comment:** added comment component #INFR-4936 ([#2268](https://github.com/atinc/ngx-tethys/issues/2268)) ([1d00c8c](https://github.com/atinc/ngx-tethys/commit/1d00c8ce5045b1a970a91447bcfa5180d45449c3)), closes [#INFR-4936](https://github.com/atinc/ngx-tethys/issues/INFR-4936)
* **shared:** add thyStringOrTemplateOutlet directive #INFR-4973 ([#2272](https://github.com/atinc/ngx-tethys/issues/2272)) ([c57de30](https://github.com/atinc/ngx-tethys/commit/c57de30eee0c0e29364b2212ade5db6f3640807a)), closes [#INFR-4973](https://github.com/atinc/ngx-tethys/issues/INFR-4973)
* **skeleton:** update thySecondaryColor default value #INFR-4965 ([#2271](https://github.com/atinc/ngx-tethys/issues/2271)) ([e360f41](https://github.com/atinc/ngx-tethys/commit/e360f41369ad4832ea8ef6a3e84963098df43a7b)), closes [#INFR-4965](https://github.com/atinc/ngx-tethys/issues/INFR-4965) [#INFR-4965](https://github.com/atinc/ngx-tethys/issues/INFR-4965)



## [14.1.1](https://github.com/atinc/ngx-tethys/compare/14.1.0...14.1.1) (2022-10-20)


### Features

* **color-picker:** add hide fun with color-picker when shut it down #INFR-4969 ([#2269](https://github.com/atinc/ngx-tethys/issues/2269)) ([91b64f9](https://github.com/atinc/ngx-tethys/commit/91b64f93c5f566d789fd6ed1fa366caf05ca28e4)), closes [#INFR-4969](https://github.com/atinc/ngx-tethys/issues/INFR-4969)



# [14.1.0](https://github.com/atinc/ngx-tethys/compare/14.0.16...14.1.0) (2022-10-18)


### Features

* **skeleton:** refactor the skeleton #INFR-4046 BREAKING CHANGE: delete legacy thy-skeleton component, place use new component ([#2175](https://github.com/atinc/ngx-tethys/issues/2175)) ([9585160](https://github.com/atinc/ngx-tethys/commit/9585160c248f317406a93461a14f9bd0d72fc97a)), closes [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046) [#INFR-4046](https://github.com/atinc/ngx-tethys/issues/INFR-4046)



## [14.0.16](https://github.com/atinc/ngx-tethys/compare/14.0.15...14.0.16) (2022-10-17)


### Bug Fixes

* **checkbox:** back checkbox UI style zd/#INFR-4881 ([0edde96](https://github.com/atinc/ngx-tethys/commit/0edde96f229a7516228bebf9380cb6155e3828dc)), closes [zd/#INFR-4881](https://github.com/atinc/ngx-tethys/issues/INFR-4881)
* **select:** dispatch focus when options changed (#INFR-4805) ([cc8c4b0](https://github.com/atinc/ngx-tethys/commit/cc8c4b0bcd62f6ed8cf9ca86adc7c1f908d0abe2)), closes [#INFR-4805](https://github.com/atinc/ngx-tethys/issues/INFR-4805)



## [14.0.15](https://github.com/atinc/ngx-tethys/compare/14.0.14...14.0.15) (2022-10-14)


### Features

* **carousel:** carousel component add thyPause #INFR-4861 ([#2250](https://github.com/atinc/ngx-tethys/issues/2250)) ([6e78892](https://github.com/atinc/ngx-tethys/commit/6e78892f8f22ff4bd20d8944b74963e400580c7a)), closes [#INFR-4861](https://github.com/atinc/ngx-tethys/issues/INFR-4861)
* **color-picker:** add thyHasBackdrop and close popover inside #INFR-4899 ([#2258](https://github.com/atinc/ngx-tethys/issues/2258)) ([9902fae](https://github.com/atinc/ngx-tethys/commit/9902fae87b4a13013fe8696c86ef33e23230fc94)), closes [#INFR-4899](https://github.com/atinc/ngx-tethys/issues/INFR-4899)



## [14.0.14](https://github.com/atinc/ngx-tethys/compare/14.0.13...14.0.14) (2022-10-13)


### Bug Fixes

* **form:** checkbox align center zd/#INFR-4881 ([#2248](https://github.com/atinc/ngx-tethys/issues/2248)) ([fb637ed](https://github.com/atinc/ngx-tethys/commit/fb637ed0766f1a58ebf91f54fdf2a32160d33b51)), closes [zd/#INFR-4881](https://github.com/atinc/ngx-tethys/issues/INFR-4881)
* **select:** change select-options padding#INFR-4893 ([#2251](https://github.com/atinc/ngx-tethys/issues/2251)) ([6089a0b](https://github.com/atinc/ngx-tethys/commit/6089a0bc432f52f7b94cc3d33bf47eb593db9be1)), closes [padding#INFR-4893](https://github.com/padding/issues/INFR-4893)


### Features

* **color-picker:** change color true time  in custiom-color-picker-panel #INFR-4897 ([#2253](https://github.com/atinc/ngx-tethys/issues/2253)) ([d49f013](https://github.com/atinc/ngx-tethys/commit/d49f01309152c916481794c107f7744259c23704)), closes [#INFR-4897](https://github.com/atinc/ngx-tethys/issues/INFR-4897)



## [14.0.13](https://github.com/atinc/ngx-tethys/compare/14.0.12...14.0.13) (2022-10-11)


### Bug Fixes

* **avatar:** dealwith name which words more , when avatar is flex or inline-flex (#INFR-4801) ([#2228](https://github.com/atinc/ngx-tethys/issues/2228)) ([533b567](https://github.com/atinc/ngx-tethys/commit/533b567952d209428fe054f400817e843246157d)), closes [#INFR-4801](https://github.com/atinc/ngx-tethys/issues/INFR-4801)
* **color-picker:**  change alpha 0-1 to 0-100 #INFR-4796 ([#2230](https://github.com/atinc/ngx-tethys/issues/2230)) ([9d1f056](https://github.com/atinc/ngx-tethys/commit/9d1f056962f177fc383d8d39b93541709c7cc331)), closes [#INFR-4796](https://github.com/atinc/ngx-tethys/issues/INFR-4796)
* **color-picker:**  fix style for default-color-picker-panel #INFR-4864 ([#2243](https://github.com/atinc/ngx-tethys/issues/2243)) ([8002bef](https://github.com/atinc/ngx-tethys/commit/8002bef172ef9a48fb012e66e92dbd5e8ca799a7)), closes [#INFR-4864](https://github.com/atinc/ngx-tethys/issues/INFR-4864)
* **color-picker:** fix closeAll bug #INFR-4807 ([#2229](https://github.com/atinc/ngx-tethys/issues/2229)) ([95cbe7a](https://github.com/atinc/ngx-tethys/commit/95cbe7af41e1085cee4d8eb55bb26471aacdc5ac))
* **color-picker:** fix error words #INFR-4797 ([#2231](https://github.com/atinc/ngx-tethys/issues/2231)) ([162a463](https://github.com/atinc/ngx-tethys/commit/162a463274e75bc509e8123bb5f404e3d38f3b4b)), closes [#INFR-4797](https://github.com/atinc/ngx-tethys/issues/INFR-4797)
* **dialog:** change sidebar-header styles selector #INFR-4777 ([61e80e0](https://github.com/atinc/ngx-tethys/commit/61e80e045f251d09a545624019fd3c758f81c675)), closes [#INFR-4777](https://github.com/atinc/ngx-tethys/issues/INFR-4777)
* **dialog:** change sidebar-header styles selector #INFR-4777 ([66d37eb](https://github.com/atinc/ngx-tethys/commit/66d37ebd7ed8e5cb3371d361e07143c4a555b662)), closes [#INFR-4777](https://github.com/atinc/ngx-tethys/issues/INFR-4777)
* **select:** delayed trigger updatePosition at thy-custom-select (#IN… ([#2239](https://github.com/atinc/ngx-tethys/issues/2239)) ([e7d702b](https://github.com/atinc/ngx-tethys/commit/e7d702b128a6437a72e639ad92152c43d312a192))
* **select:** update select options position when options data changed (#INFR-4793) ([cb92ff8](https://github.com/atinc/ngx-tethys/commit/cb92ff8a2d59342a91a8dfa5f0bd8e97d04e3974)), closes [#INFR-4793](https://github.com/atinc/ngx-tethys/issues/INFR-4793)
* **tabs:** fix outline style when enter to tab content component(#INFR-4868) ([229041c](https://github.com/atinc/ngx-tethys/commit/229041cf979d92cfc0e03cfa8be002d9946f9bf0)), closes [#INFR-4868](https://github.com/atinc/ngx-tethys/issues/INFR-4868)


### Features

* **carousel:** carousel component refactoring api #INFR-4802 ([#2238](https://github.com/atinc/ngx-tethys/issues/2238)) ([87c9fe1](https://github.com/atinc/ngx-tethys/commit/87c9fe16385e8e180c27f3a1e208005f2528c440)), closes [#INFR-4802](https://github.com/atinc/ngx-tethys/issues/INFR-4802)
* **cdk:** add dom contains HostRenderer and ManualElementRenderer, useHostRenderer and useElementRenderer ([#2234](https://github.com/atinc/ngx-tethys/issues/2234)) ([e3a6657](https://github.com/atinc/ngx-tethys/commit/e3a6657edfa10948c1edb004bc51117ff740e929))
* **color-picker:** add thyOffset parameter to control popover panel #INFR-4806 ([#2232](https://github.com/atinc/ngx-tethys/issues/2232)) ([34632af](https://github.com/atinc/ngx-tethys/commit/34632afef2e423c4e1abe86b4f205ec355ce6290)), closes [#INFR-4806](https://github.com/atinc/ngx-tethys/issues/INFR-4806)
* **tree-select:** add virtual scroll #INFR-2684 ([#2223](https://github.com/atinc/ngx-tethys/issues/2223)) ([5e65ca7](https://github.com/atinc/ngx-tethys/commit/5e65ca7f7515fb4a5350beafee423b890e891902)), closes [#INFR-2684](https://github.com/atinc/ngx-tethys/issues/INFR-2684)
* **typography:** add thyBgColor directive #INFR-4780 ([#2227](https://github.com/atinc/ngx-tethys/issues/2227)) ([2eb2103](https://github.com/atinc/ngx-tethys/commit/2eb2103c5de832975155f28fe063c82790cb85a9)), closes [#INFR-4780](https://github.com/atinc/ngx-tethys/issues/INFR-4780)



## [14.0.12](https://github.com/atinc/ngx-tethys/compare/14.0.11...14.0.12) (2022-09-28)


### Features

* **table:** add thyHeight and thyHeaderFixed #INFR-4774 ([#2221](https://github.com/atinc/ngx-tethys/issues/2221)) ([3023219](https://github.com/atinc/ngx-tethys/commit/3023219ea4989eca251f04c11e7f9732fa09276f)), closes [#INFR-4774](https://github.com/atinc/ngx-tethys/issues/INFR-4774)
* **table:** set margin style from table to footer #INFR-4773 ([12cd329](https://github.com/atinc/ngx-tethys/commit/12cd3299e6269bd1c8d07da67e82b3810918294e)), closes [#INFR-4773](https://github.com/atinc/ngx-tethys/issues/INFR-4773)
* **tabs:**  add thyResponsive to support 'more' #INFR-4600 ([#2215](https://github.com/atinc/ngx-tethys/issues/2215)) ([46ad53e](https://github.com/atinc/ngx-tethys/commit/46ad53ec70023dd62b9dadaa384278cde99f6420)), closes [#INFR-4600](https://github.com/atinc/ngx-tethys/issues/INFR-4600)



## [14.0.11](https://github.com/atinc/ngx-tethys/compare/14.0.10...14.0.11) (2022-09-27)


### Bug Fixes

* **carousel:** slide animation does not display correctly at the last index #INFR-4172 ([#2207](https://github.com/atinc/ngx-tethys/issues/2207)) ([4317285](https://github.com/atinc/ngx-tethys/commit/431728595f72bb30df35e4aa6bb08ab9cae6b452)), closes [#INFR-4172](https://github.com/atinc/ngx-tethys/issues/INFR-4172)
* **checkbox:** fix checkbox cursor error when checkbox is disabled (#… ([#2203](https://github.com/atinc/ngx-tethys/issues/2203)) ([9791619](https://github.com/atinc/ngx-tethys/commit/979161919b4edcb2d658ba5ca46589bf9e5359a7))
* **table:** fix paddingLeft to 16 when drag #INFR-4778 ([#2220](https://github.com/atinc/ngx-tethys/issues/2220)) ([f172093](https://github.com/atinc/ngx-tethys/commit/f172093aaa4817178d91a9a47923e326684d963d)), closes [#INFR-4778](https://github.com/atinc/ngx-tethys/issues/INFR-4778)
* **table:** setting paddingLeft in table group ([#2219](https://github.com/atinc/ngx-tethys/issues/2219)) ([dec21d1](https://github.com/atinc/ngx-tethys/commit/dec21d1985c64e5703d32255c9dadd99d4d64561))
* **tabs:** adjust the tabs oveflow #INFR-4674 ([6fc70dc](https://github.com/atinc/ngx-tethys/commit/6fc70dcce213cca019e6bb8c0e8aa0aadd9bb3f7)), closes [#INFR-4674](https://github.com/atinc/ngx-tethys/issues/INFR-4674)
* **tabs:** adjust the tabs var & add test for transition #INFR-4674 ([9695b91](https://github.com/atinc/ngx-tethys/commit/9695b913b6937ccdf1675271c828763e57ba74a4)), closes [#INFR-4674](https://github.com/atinc/ngx-tethys/issues/INFR-4674)
* **tabs:** set transitionStarted when activeTabIndex changed and !!thyAnimated #INFR-4745 ([9cde10b](https://github.com/atinc/ngx-tethys/commit/9cde10b94abdd265898bb1106638c37ec9607e57)), closes [#INFR-4745](https://github.com/atinc/ngx-tethys/issues/INFR-4745)
* **tree-select:** remove stopPropagation when select node ([#2211](https://github.com/atinc/ngx-tethys/issues/2211)) ([b8cbab2](https://github.com/atinc/ngx-tethys/commit/b8cbab27a097427bb6f36c0ee2700fb0af3c3499))


### Features

* **carousel:** beautify the carousel components & add image example #INFR-4172 ([#2204](https://github.com/atinc/ngx-tethys/issues/2204)) ([5fe1306](https://github.com/atinc/ngx-tethys/commit/5fe13064dcc576a225785bc149c8f9091f9d8bd7)), closes [#INFR-4172](https://github.com/atinc/ngx-tethys/issues/INFR-4172)
* **color-picker:** add color component #INFR-4214 ([#2205](https://github.com/atinc/ngx-tethys/issues/2205)) ([5be3d01](https://github.com/atinc/ngx-tethys/commit/5be3d01aaa34a1a03b18869be98fbc56cbba0e80)), closes [#INFR-4214](https://github.com/atinc/ngx-tethys/issues/INFR-4214)
* **slider:** change the diameter to 18px for slider pointer #INFR-4747 ([beae3eb](https://github.com/atinc/ngx-tethys/commit/beae3eb1440c6def54958b3f635c1701b0cf0da2)), closes [#INFR-4747](https://github.com/atinc/ngx-tethys/issues/INFR-4747)



## [14.0.10](https://github.com/atinc/ngx-tethys/compare/14.0.9...14.0.10) (2022-09-16)


### Bug Fixes

* **tabs:** adjust activeIndexTab #INFR-4697 ([#2200](https://github.com/atinc/ngx-tethys/issues/2200)) ([68d0d80](https://github.com/atinc/ngx-tethys/commit/68d0d804292f57a132fa8dca0621851231f9f6da)), closes [#INFR-4697](https://github.com/atinc/ngx-tethys/issues/INFR-4697)
* **tabs:** remove tabs overflow: hidden #INFR-4869 ([35d8f59](https://github.com/atinc/ngx-tethys/commit/35d8f59d27aeaea317a68986df1e07f351aa7fc8)), closes [#INFR-4869](https://github.com/atinc/ngx-tethys/issues/INFR-4869)
* **time-picker:** fix icon position error on Safira #INFR-4681 ([6a9e03f](https://github.com/atinc/ngx-tethys/commit/6a9e03f17719443cb4dc44db0a758136003b9443)), closes [#INFR-4681](https://github.com/atinc/ngx-tethys/issues/INFR-4681)
* **tree:** fix tree thyIndent default value 25 #INFR-4704 ([#2201](https://github.com/atinc/ngx-tethys/issues/2201)) ([61b139b](https://github.com/atinc/ngx-tethys/commit/61b139b0ac96cff6b84a57b12ffa1045c3a9b533)), closes [#INFR-4704](https://github.com/atinc/ngx-tethys/issues/INFR-4704)


### Features

* **carousel:** beautify the carousel components #INFR-4172 ([#2197](https://github.com/atinc/ngx-tethys/issues/2197)) ([585f40a](https://github.com/atinc/ngx-tethys/commit/585f40aa47edf5905f2f06ead3e35702d550136a)), closes [#INFR-4172](https://github.com/atinc/ngx-tethys/issues/INFR-4172)



## [14.0.9](https://github.com/atinc/ngx-tethys/compare/14.0.8...14.0.9) (2022-09-15)


### Features

* **table:** drag table group #INFR-4620 ([#2186](https://github.com/atinc/ngx-tethys/issues/2186)) ([6420758](https://github.com/atinc/ngx-tethys/commit/64207587128714fc6c19ea4cbdae56f4537062ad)), closes [#INFR-4620](https://github.com/atinc/ngx-tethys/issues/INFR-4620)



## [14.0.8](https://github.com/atinc/ngx-tethys/compare/14.0.7...14.0.8) (2022-09-15)


### Bug Fixes

* **styles:** add min-height: 0px to d-flex-column-fill and min-width: 0px to d-flex-row-fill ([631b010](https://github.com/atinc/ngx-tethys/commit/631b0104d19383855ba5e379bc16eb8e80ef38f0))
* **tabs:** adjust component name & var name #INFR-4669 ([cb5643a](https://github.com/atinc/ngx-tethys/commit/cb5643ad2dfb68117418480bd1c9453eab2eceae)), closes [#INFR-4669](https://github.com/atinc/ngx-tethys/issues/INFR-4669)
* **tag:** change the line-height value to the Tag height #INFR-4655 ([af5ae52](https://github.com/atinc/ngx-tethys/commit/af5ae52e2583307cc46657ddcba24a5eccaf7065)), closes [#INFR-4655](https://github.com/atinc/ngx-tethys/issues/INFR-4655)
* **typography:** update selector [thyText] to [thyText]:not(thy-divider) avoid conflict ([3bef611](https://github.com/atinc/ngx-tethys/commit/3bef61145b3cf6453b7c4363afce7770c5b30cdb))


### Features

* **carousel:** add carousel component #INFR-4172 ([#2182](https://github.com/atinc/ngx-tethys/issues/2182)) ([8dd64e3](https://github.com/atinc/ngx-tethys/commit/8dd64e39628d1b6f66651cd5c9fc2cfc93ae69bf)), closes [#INFR-4172](https://github.com/atinc/ngx-tethys/issues/INFR-4172)
* **tabs:** add tab pane animated #INFR-4635 ([#2185](https://github.com/atinc/ngx-tethys/issues/2185)) ([97d87bc](https://github.com/atinc/ngx-tethys/commit/97d87bcc2b98829040a3805c69d7c92a593e8fc8)), closes [#INFR-4635](https://github.com/atinc/ngx-tethys/issues/INFR-4635)
* **tag:** add thy-tags component #INFR-4667 [#2187](https://github.com/atinc/ngx-tethys/issues/2187) ([#2188](https://github.com/atinc/ngx-tethys/issues/2188)) ([e6c120c](https://github.com/atinc/ngx-tethys/commit/e6c120c633fcd39dcbf40db0f8e05305a4e917af)), closes [#INFR-4667](https://github.com/atinc/ngx-tethys/issues/INFR-4667)
* **tree:** add thyIndex property #INFR-4632 ([#2181](https://github.com/atinc/ngx-tethys/issues/2181)) ([1095431](https://github.com/atinc/ngx-tethys/commit/109543145662b1e28aa048b410339515d07ec0a0)), closes [#INFR-4632](https://github.com/atinc/ngx-tethys/issues/INFR-4632) [#INFR-4632](https://github.com/atinc/ngx-tethys/issues/INFR-4632)



## [14.0.7](https://github.com/atinc/ngx-tethys/compare/14.0.6...14.0.7) (2022-09-08)


### Bug Fixes

* **cascader:** should only show one column when first opened #INFR-4617 ([#2177](https://github.com/atinc/ngx-tethys/issues/2177)) ([09bfbc9](https://github.com/atinc/ngx-tethys/commit/09bfbc9fc23ce2507d802b8277a83b304041f6f9)), closes [#INFR-4617](https://github.com/atinc/ngx-tethys/issues/INFR-4617) [#INFR-4617](https://github.com/atinc/ngx-tethys/issues/INFR-4617)


### Features

* **badge:** add default type instead of secondary and support built-in color for thyTextColor and thyBackgroundColor #INFR-4576 ([#2173](https://github.com/atinc/ngx-tethys/issues/2173)) ([7cc2dcf](https://github.com/atinc/ngx-tethys/commit/7cc2dcff398808337d6b46624e4ae80086210868)), closes [#INFR-4576](https://github.com/atinc/ngx-tethys/issues/INFR-4576)
* **link:** set opacity to 50% for disabled #INFR-4621 ([#2178](https://github.com/atinc/ngx-tethys/issues/2178)) ([bf4fe5c](https://github.com/atinc/ngx-tethys/commit/bf4fe5ce77a934562aa00b86140574572cb62b9d)), closes [#INFR-4621](https://github.com/atinc/ngx-tethys/issues/INFR-4621)
* **table:** add page size controller to table pagination #INFR-3371 ([#2138](https://github.com/atinc/ngx-tethys/issues/2138)) ([736f495](https://github.com/atinc/ngx-tethys/commit/736f4956a7e8e7e2b0fb8e01f433acbe9582c0b6)), closes [#INFR-3371](https://github.com/atinc/ngx-tethys/issues/INFR-3371)
* **timeline:** improve timeline examples and overview #INFR-4538 ([d4267c0](https://github.com/atinc/ngx-tethys/commit/d4267c0a37a11a0e6a76860a3ebbdc610f6ab3e4)), closes [#INFR-4538](https://github.com/atinc/ngx-tethys/issues/INFR-4538)



## [14.0.6](https://github.com/atinc/ngx-tethys/compare/14.0.5...14.0.6) (2022-09-06)


### Bug Fixes

* **button:** update icon font-size to 16px for md size #INFR-4501 ([ac62bf2](https://github.com/atinc/ngx-tethys/commit/ac62bf29ad558aac131b37ee33aff982f641c8e1)), closes [#INFR-4501](https://github.com/atinc/ngx-tethys/issues/INFR-4501)
* **watermark:**  adjust thy way get ._vm #INFR-4556 ([d7434ca](https://github.com/atinc/ngx-tethys/commit/d7434ca4ddea07aa112d79038aac3cbf76c4af97)), closes [#INFR-4556](https://github.com/atinc/ngx-tethys/issues/INFR-4556)
* **watermark:** adjust the var name #INFR-4556 ([131ebd6](https://github.com/atinc/ngx-tethys/commit/131ebd639fb14715ecfd3a10edbb6419b1dcca34)), closes [#INFR-4556](https://github.com/atinc/ngx-tethys/issues/INFR-4556)



## [14.0.5](https://github.com/atinc/ngx-tethys/compare/14.0.4...14.0.5) (2022-09-01)


### Bug Fixes

* **property:** update property-item-padding-x to 16px and only set td padding-left to 0px ([1f5e0be](https://github.com/atinc/ngx-tethys/commit/1f5e0be4424c57d64222fd506c60cfd0583f1fb8))



## [14.0.4](https://github.com/atinc/ngx-tethys/compare/14.0.3...14.0.4) (2022-09-01)


### Bug Fixes

* **button:** adjust the padding of button-icon (#INFR-4524) ([0347ce7](https://github.com/atinc/ngx-tethys/commit/0347ce74267003fbb78d5c1cb377b35c43feb07a)), closes [#INFR-4524](https://github.com/atinc/ngx-tethys/issues/INFR-4524)
* **nav:** add class to origin when open more popover ([#2164](https://github.com/atinc/ngx-tethys/issues/2164)) ([0140a3a](https://github.com/atinc/ngx-tethys/commit/0140a3a7e53d5beb8dce69183403015c72250940))
* **popover:** add padding offset by placement and remove margin for dropdown-pane #INFR-4536 ([#2166](https://github.com/atinc/ngx-tethys/issues/2166)) ([d2624f2](https://github.com/atinc/ngx-tethys/commit/d2624f2a467bce8a43ca616d38787b2e4f2583d2)), closes [#INFR-4536](https://github.com/atinc/ngx-tethys/issues/INFR-4536)
* **property:** update padding-right to 16px for thy-properties-item-label ([23435d9](https://github.com/atinc/ngx-tethys/commit/23435d9b021b15e3e4525bbde8e1232e4f1f8aef))


### Features

* **button:** add new size md and update sm to 28px (#INFR-4501) ([#2157](https://github.com/atinc/ngx-tethys/issues/2157)) ([a367779](https://github.com/atinc/ngx-tethys/commit/a36777999ed0c5dfcaaa4da50fe5322ae0b2542a)), closes [#INFR-4501](https://github.com/atinc/ngx-tethys/issues/INFR-4501)
* **tag:** modify tag component border-radius to 4px (#INFR-4518) ([#2156](https://github.com/atinc/ngx-tethys/issues/2156)) ([c805f48](https://github.com/atinc/ngx-tethys/commit/c805f48222c9c798c79e3d92aafaaca13fb2e3a7)), closes [#INFR-4518](https://github.com/atinc/ngx-tethys/issues/INFR-4518)
* **upload:** update thyFileDrop component to directive #INFR-4529 ([7de2a37](https://github.com/atinc/ngx-tethys/commit/7de2a370cf11f8441407ae77cc2770933dea0747)), closes [#INFR-4529](https://github.com/atinc/ngx-tethys/issues/INFR-4529)


### Reverts

* Revert "fix(nav): replace nav component active-class 'active' to 'nav-active' #INFR-4482 (#2143)" ([9a40be1](https://github.com/atinc/ngx-tethys/commit/9a40be18aec1d49060345cf0b5137d8b79ec4073)), closes [#INFR-4482](https://github.com/atinc/ngx-tethys/issues/INFR-4482) [#2143](https://github.com/atinc/ngx-tethys/issues/2143)



## [14.0.3](https://github.com/atinc/ngx-tethys/compare/14.0.2...14.0.3) (2022-08-31)



## [14.0.2](https://github.com/atinc/ngx-tethys/compare/14.0.1...14.0.2) (2022-08-31)


### Bug Fixes

* **label:** fix label border-radius #INFR-4486 ([#2148](https://github.com/atinc/ngx-tethys/issues/2148)) ([4ab201e](https://github.com/atinc/ngx-tethys/commit/4ab201efce101847c5def7d337bf6402cd584281)), closes [#INFR-4486](https://github.com/atinc/ngx-tethys/issues/INFR-4486)
* **nav:** replace nav component active-class 'active' to 'nav-active' #INFR-4482 ([#2143](https://github.com/atinc/ngx-tethys/issues/2143)) ([f333f24](https://github.com/atinc/ngx-tethys/commit/f333f2410a880f31ea2b559f877fd4e9df1972b2)), closes [#INFR-4482](https://github.com/atinc/ngx-tethys/issues/INFR-4482) [#INFR-4482](https://github.com/atinc/ngx-tethys/issues/INFR-4482) [#INFR-4482](https://github.com/atinc/ngx-tethys/issues/INFR-4482) [#INFR-4482](https://github.com/atinc/ngx-tethys/issues/INFR-4482)
* **property:** remove auto fill item span  logic #INFR-4471 ([b2a9c75](https://github.com/atinc/ngx-tethys/commit/b2a9c750fd77bf45e3b3d1667749cfd378e70123)), closes [#INFR-4471](https://github.com/atinc/ngx-tethys/issues/INFR-4471)
* **select:** center thy-tag ([#2145](https://github.com/atinc/ngx-tethys/issues/2145)) ([de34ae7](https://github.com/atinc/ngx-tethys/commit/de34ae74c122da4e851a9d4bff5c9a64cecf8cf6))
* **select:** fix select-control height when empty and center placeholder ([#2150](https://github.com/atinc/ngx-tethys/issues/2150)) ([a650e57](https://github.com/atinc/ngx-tethys/commit/a650e57a024bcbf10f24e0753ea47edbd8f9403b))
* **watermark:** adjust the refresh condition #INFR-4478 ([e667d73](https://github.com/atinc/ngx-tethys/commit/e667d73b53ce8a8958f170d8611018ffdecfc0b3)), closes [#INFR-4478](https://github.com/atinc/ngx-tethys/issues/INFR-4478)


### Features

* **mention:** add show suggestions limit #INFR-176 ([#2140](https://github.com/atinc/ngx-tethys/issues/2140)) ([d68bcb9](https://github.com/atinc/ngx-tethys/commit/d68bcb927ba94c084da11354eceaf03104b0c98d)), closes [#INFR-176](https://github.com/atinc/ngx-tethys/issues/INFR-176)
* **select:** change select and tree-select border-radius to dropdown… ([#2147](https://github.com/atinc/ngx-tethys/issues/2147)) ([7bf0eae](https://github.com/atinc/ngx-tethys/commit/7bf0eae93be348df3df3450408f31c92f56895d2))



## [14.0.1](https://github.com/atinc/ngx-tethys/compare/13.2.7...14.0.1) (2022-08-26)



# [14.0.0](https://github.com/atinc/ngx-tethys/compare/13.2.5...14.0.0) (2022-08-24)



# [14.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.0.0-next.0...14.0.0-next.1) (2022-08-16)



# [14.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/13.2.1...14.0.0-next.0) (2022-08-11)



## [13.2.7](https://github.com/atinc/ngx-tethys/compare/13.2.6...13.2.7) (2022-08-26)


### Bug Fixes

* **button:** add active class and fix btn-icon-active style error #INFR-4378 ([#2129](https://github.com/atinc/ngx-tethys/issues/2129)) ([2919678](https://github.com/atinc/ngx-tethys/commit/291967843281bf5176f815ea2e9e4ff2c4226864)), closes [#INFR-4378](https://github.com/atinc/ngx-tethys/issues/INFR-4378)
* **property:** set thy-properties block and set padding-right for property label ([61aaddf](https://github.com/atinc/ngx-tethys/commit/61aaddfca7023044ff475911c1c841c34086fc91))
* **select:** center select control value ([#2131](https://github.com/atinc/ngx-tethys/issues/2131)) ([f3dab37](https://github.com/atinc/ngx-tethys/commit/f3dab37397ed435269fb35ad46c5aefcab71b807))


### Features

* **property:** blur when click in  previous overlay ([a291edf](https://github.com/atinc/ngx-tethys/commit/a291edf0680a34c4277ebc442da552024d6486a6))



## [13.2.6](https://github.com/atinc/ngx-tethys/compare/13.2.5...13.2.6) (2022-08-25)


### Bug Fixes

* **dialog:** import ThyCheckboxModule #INFR-4410 ([08ea36f](https://github.com/atinc/ngx-tethys/commit/08ea36f4e95dfac80bfb900ffed50324ce709c18)), closes [#INFR-4410](https://github.com/atinc/ngx-tethys/issues/INFR-4410)
* **property:** add thyFlexibleText for label text and add property-item-editor-offset for margin-left #INFR-4394 ([#2117](https://github.com/atinc/ngx-tethys/issues/2117)) ([7ab2c9e](https://github.com/atinc/ngx-tethys/commit/7ab2c9e6158684495950a9004e8034d06f33b7a5)), closes [#INFR-4394](https://github.com/atinc/ngx-tethys/issues/INFR-4394)
* **time-picker:** fix use origin value when input not valid date and improve test #INFR-4316 ([#2108](https://github.com/atinc/ngx-tethys/issues/2108)) ([153e7eb](https://github.com/atinc/ngx-tethys/commit/153e7ebc824c2f6ccc557dad8fe0869fc5032074)), closes [#INFR-4316](https://github.com/atinc/ngx-tethys/issues/INFR-4316)


### Features

* **cascader:** add mulitple feature #INFR-2596 ([#2111](https://github.com/atinc/ngx-tethys/issues/2111)) ([8e745fb](https://github.com/atinc/ngx-tethys/commit/8e745fb29ff331d9b3bf3d0d4673e524be32b7cf)), closes [#INFR-2596](https://github.com/atinc/ngx-tethys/issues/INFR-2596)
* **mention:** add isOpened for mention directive #INFR-4414 ([e342745](https://github.com/atinc/ngx-tethys/commit/e3427458f0889f643bcadf38e04b037cc6333985)), closes [#INFR-4414](https://github.com/atinc/ngx-tethys/issues/INFR-4414)
* **property:** add thySpan for thy-property-item #INFR-4358 ([#2116](https://github.com/atinc/ngx-tethys/issues/2116)) ([d902859](https://github.com/atinc/ngx-tethys/commit/d902859d40b8695012ca2a802013b33e98ad9221)), closes [#INFR-4358](https://github.com/atinc/ngx-tethys/issues/INFR-4358)
* **property:** support property editing ([#2120](https://github.com/atinc/ngx-tethys/issues/2120)) ([20edd1a](https://github.com/atinc/ngx-tethys/commit/20edd1a5527c063feef824c6106f2dc9b9ce074c))
* **typography:** add typography module contains thy-text #INFR-4234 ([#2099](https://github.com/atinc/ngx-tethys/issues/2099)) ([16aa7ba](https://github.com/atinc/ngx-tethys/commit/16aa7ba4e099d44018ee08678efba5a92d72374a)), closes [#INFR-4234](https://github.com/atinc/ngx-tethys/issues/INFR-4234)



## [13.2.5](https://github.com/atinc/ngx-tethys/compare/13.2.4...13.2.5) (2022-08-24)


### Bug Fixes

* **form:** fix label-required margin to 4px(#INFR-4338) ([#2107](https://github.com/atinc/ngx-tethys/issues/2107)) ([79d5bb5](https://github.com/atinc/ngx-tethys/commit/79d5bb59ae692d852b456eae7fdcc6d618e347ff)), closes [#INFR-4338](https://github.com/atinc/ngx-tethys/issues/INFR-4338)
* **property:**  don't render item element when property item is null  #INFR-4359 ([f8ad288](https://github.com/atinc/ngx-tethys/commit/f8ad288aa0a454b6b446e8ad14f78c795a0c05b7)), closes [#INFR-4359](https://github.com/atinc/ngx-tethys/issues/INFR-4359)
* **property:** optimize property editing #INFR-4361 #INFR-4363 ([#2109](https://github.com/atinc/ngx-tethys/issues/2109)) ([19153fd](https://github.com/atinc/ngx-tethys/commit/19153fd8e3f09b02bd77fec40165dccececa1872)), closes [#INFR-4361](https://github.com/atinc/ngx-tethys/issues/INFR-4361) [#INFR-4363](https://github.com/atinc/ngx-tethys/issues/INFR-4363)


### Features

* **menu:** show group icon when thyCollapsed is true #INFR-4366 ([433dbb5](https://github.com/atinc/ngx-tethys/commit/433dbb510920516f53e994c33ce7e56cc55f6e53)), closes [#INFR-4366](https://github.com/atinc/ngx-tethys/issues/INFR-4366)



## [13.2.4](https://github.com/atinc/ngx-tethys/compare/13.2.3...13.2.4) (2022-08-23)


### Bug Fixes

* **image:** fix blob image preview error #INFR-4333 ([#2103](https://github.com/atinc/ngx-tethys/issues/2103)) ([2e8c34d](https://github.com/atinc/ngx-tethys/commit/2e8c34d72ed436ce6dee4eadf5ad997e72a719d5)), closes [#INFR-4333](https://github.com/atinc/ngx-tethys/issues/INFR-4333)



## [13.2.3](https://github.com/atinc/ngx-tethys/compare/13.2.2...13.2.3) (2022-08-19)


### Bug Fixes

* **property:** update property item  align-items is baseline #INFR-4285 ([d8d7c22](https://github.com/atinc/ngx-tethys/commit/d8d7c2295d017e15cb3bb1ad8328dff87678bdc0)), closes [#INFR-4285](https://github.com/atinc/ngx-tethys/issues/INFR-4285)
* **property:** update style, property label aalways top alignment ##INFR-4285 ([005344b](https://github.com/atinc/ngx-tethys/commit/005344b39b145b8870cbc5752f959c0e21b402c6)), closes [#INFR-4285](https://github.com/atinc/ngx-tethys/issues/INFR-4285)
* **watermark:** adjust the fake-box style #INFR-4287 ([7e4d96e](https://github.com/atinc/ngx-tethys/commit/7e4d96e076a455e2ac9873f6006a20a098929b33)), closes [#INFR-4287](https://github.com/atinc/ngx-tethys/issues/INFR-4287)


### Features

* **property:** support keep editing #INFR-4275 ([#2091](https://github.com/atinc/ngx-tethys/issues/2091)) ([ceb67a0](https://github.com/atinc/ngx-tethys/commit/ceb67a0564155154be57dc58e923a3f826425831)), closes [#INFR-4275](https://github.com/atinc/ngx-tethys/issues/INFR-4275)



## [13.2.2](https://github.com/atinc/ngx-tethys/compare/13.2.1...13.2.2) (2022-08-17)


### Bug Fixes

* **collapse:** fix collapse empty box style #INFR-4220 ([1f5a788](https://github.com/atinc/ngx-tethys/commit/1f5a7882aef62b23895c290b35787058f3d7bdce)), closes [#INFR-4220](https://github.com/atinc/ngx-tethys/issues/INFR-4220)
* **watermark:** adjust the var name & add test #INFO-4106 ([#2085](https://github.com/atinc/ngx-tethys/issues/2085)) ([aa4ad36](https://github.com/atinc/ngx-tethys/commit/aa4ad361337935a23fbf35bf41f516e8f326bada)), closes [#INFO-4106](https://github.com/atinc/ngx-tethys/issues/INFO-4106)


### Features

* **tabs:** change padding of tabs content  to 16px #INFR-4204 ([#2082](https://github.com/atinc/ngx-tethys/issues/2082)) ([330c1de](https://github.com/atinc/ngx-tethys/commit/330c1deff97b4008e77db9442c2c876f84e9d6f0)), closes [#INFR-4204](https://github.com/atinc/ngx-tethys/issues/INFR-4204)
* **time-picker:** add new TimePicker #INFR-4147 ([#2087](https://github.com/atinc/ngx-tethys/issues/2087)) ([fa8cc62](https://github.com/atinc/ngx-tethys/commit/fa8cc62f18446ea727a848dc4b76c7222cdf7a53)), closes [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147) [#INFR-4147](https://github.com/atinc/ngx-tethys/issues/INFR-4147)

# [14.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/14.0.0-next.0...14.0.0-next.1) (2022-08-16)

- build: upgrade Angular to 14

# [14.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/13.2.1...14.0.0-next.0) (2022-08-11)

- build: upgrade Angular to 14

## [13.2.1](https://github.com/atinc/ngx-tethys/compare/13.2.0...13.2.1) (2022-08-11)


### Bug Fixes

* **property:** fix property can not dynamic rendering property-item (#INFR-4163) ([8f273a0](https://github.com/atinc/ngx-tethys/commit/8f273a0d4a672d6b39903a6620a3760bdb0c70a8)), closes [#INFR-4163](https://github.com/atinc/ngx-tethys/issues/INFR-4163)



# [13.2.0](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.6...13.2.0) (2022-08-11)


### Features

* **layout:** add thyShadow for thy-header #INFR-4049 ([#2071](https://github.com/atinc/ngx-tethys/issues/2071)) ([d662cf5](https://github.com/atinc/ngx-tethys/commit/d662cf57860de2a312dac0a66d065ec2aded1e79)), closes [#INFR-4049](https://github.com/atinc/ngx-tethys/issues/INFR-4049)



# [13.2.0-next.6](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.5...13.2.0-next.6) (2022-08-11)


### Features

* **arrow-switcher:** add lite theme for arrow switcher zd/#INFR-4138 ([#2067](https://github.com/atinc/ngx-tethys/issues/2067)) ([01cc602](https://github.com/atinc/ngx-tethys/commit/01cc602398b7c60714e94c2ca07786426a48c1c1)), closes [zd/#INFR-4138](https://github.com/atinc/ngx-tethys/issues/INFR-4138)
* **nav:** add lite mode for nav and tabs #INFR-4149 ([#2068](https://github.com/atinc/ngx-tethys/issues/2068)) ([4774de3](https://github.com/atinc/ngx-tethys/commit/4774de3e39061e145df9d22a58cccd9e538804f7)), closes [#INFR-4149](https://github.com/atinc/ngx-tethys/issues/INFR-4149)



# [13.2.0-next.5](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.4...13.2.0-next.5) (2022-08-09)


### Bug Fixes

* **nav:** remove transform: translateY(1px); from thy-nav-item for secondary type #INFR-4132 ([#2065](https://github.com/atinc/ngx-tethys/issues/2065)) ([ce805a6](https://github.com/atinc/ngx-tethys/commit/ce805a63059fe146a83e044d0a74638188a4820b)), closes [#INFR-4132](https://github.com/atinc/ngx-tethys/issues/INFR-4132)
* **shared:** fix option-group group-name style error #INFR-3841 ([beeed04](https://github.com/atinc/ngx-tethys/commit/beeed048eb07739bc4953f95514c24e0c1239233)), closes [#INFR-3841](https://github.com/atinc/ngx-tethys/issues/INFR-3841)


### Features

* **tabs:** tabs support disable tab #INFR-4104 ([#2059](https://github.com/atinc/ngx-tethys/issues/2059)) ([b7433f3](https://github.com/atinc/ngx-tethys/commit/b7433f358ce348756078f1c08f1d418e3fd54877)), closes [#INFR-4104](https://github.com/atinc/ngx-tethys/issues/INFR-4104)
* **tabs:** tabs support set thyPosition #INFR-4026 ([#2058](https://github.com/atinc/ngx-tethys/issues/2058)) ([e4eb60d](https://github.com/atinc/ngx-tethys/commit/e4eb60d97a5f569c8a589dfe889df214c39388c1)), closes [#INFR-4026](https://github.com/atinc/ngx-tethys/issues/INFR-4026)



# [13.2.0-next.4](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.3...13.2.0-next.4) (2022-08-05)


### Bug Fixes

* **tree:** fix tree loop nesting error (#INFR-4077) ([bc8774d](https://github.com/atinc/ngx-tethys/commit/bc8774d4e25fefe2d5810d00a00fa2ced1e5a8e7)), closes [#INFR-4077](https://github.com/atinc/ngx-tethys/issues/INFR-4077)


### Features

* **property:** add thy-properties and thy-property-item components  #INFR-4044 ([#2054](https://github.com/atinc/ngx-tethys/issues/2054)) ([921d53a](https://github.com/atinc/ngx-tethys/commit/921d53a98d4652fb2d5e86f3ae3c74baa292c748)), closes [#INFR-4044](https://github.com/atinc/ngx-tethys/issues/INFR-4044)



# [13.2.0-next.3](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.2...13.2.0-next.3) (2022-08-05)


### Bug Fixes

* **watermark:** add fontSize config #INFR-4101 ([d4a130d](https://github.com/atinc/ngx-tethys/commit/d4a130d5432e63bdd8b6806e1d13e8a286e37c94)), closes [#INFR-4101](https://github.com/atinc/ngx-tethys/issues/INFR-4101)



# [13.2.0-next.2](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.1...13.2.0-next.2) (2022-08-05)


### Bug Fixes

* **watermark:** adjust the canvas style #INFR-4089 ([#2051](https://github.com/atinc/ngx-tethys/issues/2051)) ([e301f73](https://github.com/atinc/ngx-tethys/commit/e301f73053b294a5b5e93bca150c88540f3f9ff9)), closes [#INFR-4089](https://github.com/atinc/ngx-tethys/issues/INFR-4089)


### Features

* **tabs:** tabs support set tab id #INFR-4082 ([04b5a12](https://github.com/atinc/ngx-tethys/commit/04b5a12e992b0dd83bc7ca4fe0393fcbe88b4068)), closes [#INFR-4082](https://github.com/atinc/ngx-tethys/issues/INFR-4082)



# [13.2.0-next.1](https://github.com/atinc/ngx-tethys/compare/13.2.0-next.0...13.2.0-next.1) (2022-08-04)


### Bug Fixes

* **drag-drop:** add 30ms when exec setTimeout #INFR-4050 ([#2035](https://github.com/atinc/ngx-tethys/issues/2035)) ([64ca39e](https://github.com/atinc/ngx-tethys/commit/64ca39e7b61e8a03f4b04b510e6b5a204ce18db5)), closes [#INFR-4050](https://github.com/atinc/ngx-tethys/issues/INFR-4050)
* **watermark:** adjust the watermark style #INFR-4058 ([#2045](https://github.com/atinc/ngx-tethys/issues/2045)) ([395c9ee](https://github.com/atinc/ngx-tethys/commit/395c9eefc578b0afa7d4a37dac6fd34b0b3c75dc)), closes [#INFR-4058](https://github.com/atinc/ngx-tethys/issues/INFR-4058)


### Features

* update default size to 48px for thy-nav, thy-layout and thy-tabs, lg: 52px, sm: 44px #INFR-4075 ([#2046](https://github.com/atinc/ngx-tethys/issues/2046)) ([8146b98](https://github.com/atinc/ngx-tethys/commit/8146b98906b14f08ab4838655607173a9bd1603c)), closes [#INFR-4075](https://github.com/atinc/ngx-tethys/issues/INFR-4075) [#INFR-4075](https://github.com/atinc/ngx-tethys/issues/INFR-4075)



# [13.2.0-next.0](https://github.com/atinc/ngx-tethys/compare/13.1.11...13.2.0-next.0) (2022-08-03)


### Bug Fixes

* **dropdown:** remove unnecessary style ([3dfd8be](https://github.com/atinc/ngx-tethys/commit/3dfd8bee13c67eec80b8b9de578951762a71dd5d))


### Features

* **dialog:** add hostClass to automatically add class when dynamical… ([#2039](https://github.com/atinc/ngx-tethys/issues/2039)) ([204c67d](https://github.com/atinc/ngx-tethys/commit/204c67d53d14dfd0f848c0d27467cea327df9bd1)), closes [#INFR-4042](https://github.com/atinc/ngx-tethys/issues/INFR-4042)
* **nav:** add pills and tabs for nav and add thyExtra template, refactor tabs component #INFR-3762 ([#2040](https://github.com/atinc/ngx-tethys/issues/2040)) ([33c8028](https://github.com/atinc/ngx-tethys/commit/33c8028664a4ddb524f569bd2d333e2d30282d29)), closes [#INFR-3762](https://github.com/atinc/ngx-tethys/issues/INFR-3762) [#INFR-3762](https://github.com/atinc/ngx-tethys/issues/INFR-3762) [#INFR-3762](https://github.com/atinc/ngx-tethys/issues/INFR-3762)
* **tabs:** add tabs module contains thy-tabs and thy-tab components #INFR-78 ([#2029](https://github.com/atinc/ngx-tethys/issues/2029)) ([5567c1c](https://github.com/atinc/ngx-tethys/commit/5567c1ca39a6fe793cef0475c88ba42cf395bbbe)), closes [#INFR-78](https://github.com/atinc/ngx-tethys/issues/INFR-78)



## [13.1.11](https://github.com/atinc/ngx-tethys/compare/13.1.10...13.1.11) (2022-08-02)


### Bug Fixes

* **date-range:** fix date range test #INFR-4051 ([3013cbc](https://github.com/atinc/ngx-tethys/commit/3013cbc716ebceddfaa7733012b6395a86eed9dd)), closes [#INFR-4051](https://github.com/atinc/ngx-tethys/issues/INFR-4051)
* **tree-select:** fix bubble caused by deletion#INFR-3950 ([1e61ab9](https://github.com/atinc/ngx-tethys/commit/1e61ab97c5dbe2f91bb7befa4c15521a99d2b1fe)), closes [deletion#INFR-3950](https://github.com/deletion/issues/INFR-3950)
* **tree-select:** fix input init twinkle#INFR-3915 ([c8a8fd9](https://github.com/atinc/ngx-tethys/commit/c8a8fd94de29bf593829ff1748ca754e9337bb4f)), closes [twinkle#INFR-3915](https://github.com/twinkle/issues/INFR-3915)
* **tree-select:** fix input init twinkle#INFR-3915 ([2484e26](https://github.com/atinc/ngx-tethys/commit/2484e267df52c8cdfa1e078a00caeaaf5a5b5255)), closes [twinkle#INFR-3915](https://github.com/twinkle/issues/INFR-3915)
* **tree-select:** fix input init twinkle#INFR-3915 ([bf0fccd](https://github.com/atinc/ngx-tethys/commit/bf0fccda8fc6b63d289179eb59fdefc731a420a5)), closes [twinkle#INFR-3915](https://github.com/twinkle/issues/INFR-3915)
* **tree:** fix parent checked state error when initial data has check… ([#2032](https://github.com/atinc/ngx-tethys/issues/2032)) ([c3828ab](https://github.com/atinc/ngx-tethys/commit/c3828ab9dac84e2247966a2ef27c3c5217f567c9)), closes [#INFR-4029](https://github.com/atinc/ngx-tethys/issues/INFR-4029)


### Features

* **dialog:** add hasSidebar config to support layout style in dialog… ([#2033](https://github.com/atinc/ngx-tethys/issues/2033)) ([10610a3](https://github.com/atinc/ngx-tethys/commit/10610a32001d6108c4b07e0a714ebf8aee61b415))
* **watermark:**  add ThyWatermarkDirective #INFR-4001 ([#2031](https://github.com/atinc/ngx-tethys/issues/2031)) ([484eb95](https://github.com/atinc/ngx-tethys/commit/484eb954cdb53a0828ada8811dcc80c05944fd29)), closes [#INFR-4001](https://github.com/atinc/ngx-tethys/issues/INFR-4001)



## [13.1.10](https://github.com/atinc/ngx-tethys/compare/13.1.9...13.1.10) (2022-07-27)


### Bug Fixes

* **drag-drop:** fix slow drag when too many element #INFR-3935 ([#2009](https://github.com/atinc/ngx-tethys/issues/2009)) ([8ff3904](https://github.com/atinc/ngx-tethys/commit/8ff3904ba3696682f05ae793999c01c1e0ad9c2e)), closes [#INFR-3935](https://github.com/atinc/ngx-tethys/issues/INFR-3935)



## [13.1.9](https://github.com/atinc/ngx-tethys/compare/13.1.8...13.1.9) (2022-07-26)


### Bug Fixes

* **image:** use merge config when open dialog #WIK-7850 ([#2025](https://github.com/atinc/ngx-tethys/issues/2025)) ([fd4e0b3](https://github.com/atinc/ngx-tethys/commit/fd4e0b346e23d38832fdd3eb80b25a508776c67a)), closes [#WIK-7850](https://github.com/atinc/ngx-tethys/issues/WIK-7850)



## [13.1.8](https://github.com/atinc/ngx-tethys/compare/13.1.7...13.1.8) (2022-07-25)


### Bug Fixes

* **layout:** restore collapseVisible when drag width to thyCollapsedWidth ([b2a4264](https://github.com/atinc/ngx-tethys/commit/b2a4264ea41c96f9c2457bf12bb234be6e1715a7))


### Features

* **dropdown:** add thyDropdownActive directive that set active classes of origin and it's ancestors [#2021](https://github.com/atinc/ngx-tethys/issues/2021) ([#2023](https://github.com/atinc/ngx-tethys/issues/2023)) ([bc8bbe6](https://github.com/atinc/ngx-tethys/commit/bc8bbe6c679f114ee25ba6a8dcb63946d8c3ec66))



## [13.1.7](https://github.com/atinc/ngx-tethys/compare/13.1.6...13.1.7) (2022-07-23)


### Bug Fixes

* **layout:** add display contents when collapseVisible is not false ([c57534a](https://github.com/atinc/ngx-tethys/commit/c57534ad88eb0cc58e2c6da5349a1be91a2c00c5))



## [13.1.6](https://github.com/atinc/ngx-tethys/compare/13.1.5...13.1.6) (2022-07-23)


### Bug Fixes

* **layout:** add display: contents to sidebar-drag ([9b7f55a](https://github.com/atinc/ngx-tethys/commit/9b7f55a996a67a43ab7bf8a44a4834e0cd86bd33))
* **layout:** remove sidebar-drag styles for fix can't click sidebar when set thyDraggable as true ([d4f62e5](https://github.com/atinc/ngx-tethys/commit/d4f62e5d55bf6d7d34773a671094376d4fa7744c))



## [13.1.5](https://github.com/atinc/ngx-tethys/compare/13.1.4...13.1.5) (2022-07-23)


### Bug Fixes

* **layout:** move z-index to sidebar-resize-handle from sidebar-resize-line ([a123609](https://github.com/atinc/ngx-tethys/commit/a123609ce5d76ac2b329047b479f702fd4c16e04))
* **table:** update xlg height to 60px and cell-padding-xlg to 12px ([642b8fe](https://github.com/atinc/ngx-tethys/commit/642b8fe70fa8e2fb9e83e638dece887411b71093))


### Features

* **collapse:** refactor components api, docs and examples ([#2016](https://github.com/atinc/ngx-tethys/issues/2016)) ([345d182](https://github.com/atinc/ngx-tethys/commit/345d18216dfa6e2d765d21b8aa8e0adf3b70afd0))



## [13.1.4](https://github.com/atinc/ngx-tethys/compare/13.1.3...13.1.4) (2022-07-22)


### Bug Fixes

* **layout:** adjust layout sidebar collaspe icon top #INFR-3937 ([#2011](https://github.com/atinc/ngx-tethys/issues/2011)) ([d9376b0](https://github.com/atinc/ngx-tethys/commit/d9376b0aeca57b8b9f08c34615c781c2e7fdcd34)), closes [#INFR-3937](https://github.com/atinc/ngx-tethys/issues/INFR-3937)
* **layout:** adjust the sidebar-collapse-line style  #INFR-3939 ([b29e255](https://github.com/atinc/ngx-tethys/commit/b29e255fb2c372d42126e839837f6547f7ad4187)), closes [#INFR-3939](https://github.com/atinc/ngx-tethys/issues/INFR-3939)


### Features

* **collapse:** add thyTheme support divided, bordered and ghost, deprecate thyBordered and thyGhost #INFR-3904 ([#2003](https://github.com/atinc/ngx-tethys/issues/2003)) ([0570a3b](https://github.com/atinc/ngx-tethys/commit/0570a3b933f481b0d065aeb8eaa6415493b82887)), closes [#INFR-3904](https://github.com/atinc/ngx-tethys/issues/INFR-3904)
* **layout:** add thyDragWidthChange for thy-sidebar #INFR-3942 ([c4e07d5](https://github.com/atinc/ngx-tethys/commit/c4e07d5f3738b55b621c976ddd8dbb1b0d31cc82)), closes [#INFR-3942](https://github.com/atinc/ngx-tethys/issues/INFR-3942)
* **menu:** add action active class #INFR-3930 ([#2010](https://github.com/atinc/ngx-tethys/issues/2010)) ([3ac436f](https://github.com/atinc/ngx-tethys/commit/3ac436f9d6ee17eb377970dbaf3e88ad74f00a3e)), closes [#INFR-3930](https://github.com/atinc/ngx-tethys/issues/INFR-3930)



## [13.1.3](https://github.com/atinc/ngx-tethys/compare/13.1.2...13.1.3) (2022-07-21)


### Bug Fixes

* **image:** set restoreFocus false when open dialog #WIK-7834 ([#2007](https://github.com/atinc/ngx-tethys/issues/2007)) ([eb353cc](https://github.com/atinc/ngx-tethys/commit/eb353ccb5aabdf8a6b5479f403def79546d231b5)), closes [#WIK-7834](https://github.com/atinc/ngx-tethys/issues/WIK-7834)
* **menu:** modify more icon m-l #INFR-3717 ([c49642f](https://github.com/atinc/ngx-tethys/commit/c49642f4e0a3172c9bd1650c77a4eab14b53cb50)), closes [#INFR-3717](https://github.com/atinc/ngx-tethys/issues/INFR-3717)



## [13.1.2](https://github.com/atinc/ngx-tethys/compare/13.1.1...13.1.2) (2022-07-20)


### Bug Fixes

* **image:** remove time #INFR-3912 ([#2004](https://github.com/atinc/ngx-tethys/issues/2004)) ([00d6d0f](https://github.com/atinc/ngx-tethys/commit/00d6d0f5fdc73bc96fa6ca3ad7dffd95a104a9de)), closes [#INFR-3912](https://github.com/atinc/ngx-tethys/issues/INFR-3912)



## [13.1.1](https://github.com/atinc/ngx-tethys/compare/13.1.0...13.1.1) (2022-07-20)


### Bug Fixes

* **nav:** set moreBtnOffset when init ([d3b8f05](https://github.com/atinc/ngx-tethys/commit/d3b8f059c763bda8cba0a94b1162d66eec66925b))



# [13.1.0](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.49...13.1.0) (2022-07-19)


### Bug Fixes

* **action:** move border-radius from hover to thy-action to fix border-radius disappear when mouse leave action ([df75ec0](https://github.com/atinc/ngx-tethys/commit/df75ec059efad35085a3d67027f1f60bb9cb4b39))
* **nav:** hidden overflow nvaItem when container change size ([#1991](https://github.com/atinc/ngx-tethys/issues/1991)) ([5bc2ac6](https://github.com/atinc/ngx-tethys/commit/5bc2ac6f83981dd3b8295dee6d82763011c63d98))



# [13.1.0-next.49](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.48...13.1.0-next.49) (2022-07-19)


### Features

* **image:** support thyResolveSize ([#1993](https://github.com/atinc/ngx-tethys/issues/1993)) ([4c10412](https://github.com/atinc/ngx-tethys/commit/4c10412e9feafec572ba30c656a2e56f6fe67993))
* update issue template ([aa9cd49](https://github.com/atinc/ngx-tethys/commit/aa9cd49c6b7d366dacf9313d0cb9aa85ec5f31f7))



# [13.1.0-next.48](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.47...13.1.0-next.48) (2022-07-18)


### Bug Fixes

* **drag-drop:** reset draggable when change thyDragDisabled #INFR-3887 ([#1987](https://github.com/atinc/ngx-tethys/issues/1987)) ([3272ffb](https://github.com/atinc/ngx-tethys/commit/3272ffbad36c37c95159cbd07540793ae6734d91)), closes [#INFR-3887](https://github.com/atinc/ngx-tethys/issues/INFR-3887)
* **guider:** fix doc error #INFR-3879 ([#1985](https://github.com/atinc/ngx-tethys/issues/1985)) ([9ab467c](https://github.com/atinc/ngx-tethys/commit/9ab467c142951db48a626dfd17b4323a07340a94)), closes [#INFR-3879](https://github.com/atinc/ngx-tethys/issues/INFR-3879)



# [13.1.0-next.47](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.46...13.1.0-next.47) (2022-07-15)


### Bug Fixes

* **image:** add setTimeout when get parentElement #INFR-3862 ([#1981](https://github.com/atinc/ngx-tethys/issues/1981)) ([f47580f](https://github.com/atinc/ngx-tethys/commit/f47580fbf019bec9274bfbccd78663892ee8baa7)), closes [#INFR-3862](https://github.com/atinc/ngx-tethys/issues/INFR-3862)
* **image:** modify the background color transparency when hovering #INFR-3872 ([#1983](https://github.com/atinc/ngx-tethys/issues/1983)) ([4e2c38d](https://github.com/atinc/ngx-tethys/commit/4e2c38dfd4167d51a7be97da71a151972d4d7c53)), closes [#INFR-3872](https://github.com/atinc/ngx-tethys/issues/INFR-3872)



# [13.1.0-next.46](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.45...13.1.0-next.46) (2022-07-15)


### Bug Fixes

* **date-picker:** in chooseDecade can not set year when value is null #INFR-3858 ([#1978](https://github.com/atinc/ngx-tethys/issues/1978)) ([392ae77](https://github.com/atinc/ngx-tethys/commit/392ae7798e61b0cf2145786d5148ca9a9ae0ff4b)), closes [#INFR-3858](https://github.com/atinc/ngx-tethys/issues/INFR-3858)
* **image:** insert image at correct position and remove image  when destroy #INFR-3862 ([#1979](https://github.com/atinc/ngx-tethys/issues/1979)) ([d4786e5](https://github.com/atinc/ngx-tethys/commit/d4786e54e1173990fa7a509ebc8171058d0a3311)), closes [#INFR-3862](https://github.com/atinc/ngx-tethys/issues/INFR-3862)



# [13.1.0-next.45](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.44...13.1.0-next.45) (2022-07-14)


### Features

* **image:** support calc image size #WIK-6711 ([#1972](https://github.com/atinc/ngx-tethys/issues/1972)) ([e411f97](https://github.com/atinc/ngx-tethys/commit/e411f977f8b33ba93b53e588750e09fdb47b2edc)), closes [#WIK-6711](https://github.com/atinc/ngx-tethys/issues/WIK-6711)



# [13.1.0-next.44](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.43...13.1.0-next.44) (2022-07-14)


### Bug Fixes

* **slide:** add ngZone to viewportRuler.change #INFR-3840 ([ec993a3](https://github.com/atinc/ngx-tethys/commit/ec993a3fee19301192ec5b7f1bc6eaae5e8aafec)), closes [#INFR-3840](https://github.com/atinc/ngx-tethys/issues/INFR-3840)
* **tree-select:** set tree node can be extend when disabled #INFR-3848 ([#1970](https://github.com/atinc/ngx-tethys/issues/1970)) ([4e704a4](https://github.com/atinc/ngx-tethys/commit/4e704a49a27574ed2971214ae276e9ee15e322c7)), closes [#INFR-3848](https://github.com/atinc/ngx-tethys/issues/INFR-3848)


### Features

* **image:** get all images under the outermost thy-image-group #INFR-3853 ([#1973](https://github.com/atinc/ngx-tethys/issues/1973)) ([7b74035](https://github.com/atinc/ngx-tethys/commit/7b740351bba738bc7325a1424d6cec08eb33b6c0)), closes [#INFR-3853](https://github.com/atinc/ngx-tethys/issues/INFR-3853)



# [13.1.0-next.43](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.42...13.1.0-next.43) (2022-07-12)


### Bug Fixes

* **notify:** handle overlay is destroyed case #INFR-3838 ([#1968](https://github.com/atinc/ngx-tethys/issues/1968)) ([09df47c](https://github.com/atinc/ngx-tethys/commit/09df47ccb4f935b7c90b311ff2e14001156c1f22)), closes [#INFR-3838](https://github.com/atinc/ngx-tethys/issues/INFR-3838)



# [13.1.0-next.42](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.41...13.1.0-next.42) (2022-07-12)


### Bug Fixes

* **image:** handle copy relative url and use detectChanges #WIK-7628 ([#1966](https://github.com/atinc/ngx-tethys/issues/1966)) ([e25ac57](https://github.com/atinc/ngx-tethys/commit/e25ac57c68fbe1fe696ad3c367acca86c766c5f5)), closes [#WIK-7628](https://github.com/atinc/ngx-tethys/issues/WIK-7628)
* **tree:** modify thy-action margin(from -8px to -10px) #INFR-3835 ([bb0ecc3](https://github.com/atinc/ngx-tethys/commit/bb0ecc323bd84b9bd814189e7a2574b3e68ce063)), closes [#INFR-3835](https://github.com/atinc/ngx-tethys/issues/INFR-3835)



# [13.1.0-next.41](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.40...13.1.0-next.41) (2022-07-08)


### Bug Fixes

* **dot:** fix dot size attribute and document ([1dbf940](https://github.com/atinc/ngx-tethys/commit/1dbf9402a3012f1066e5c203240f2e3075cfaa4c))
* **fullscreen:** fix fullscreen bug on Immersive mode #INFR-3823 ([#1962](https://github.com/atinc/ngx-tethys/issues/1962)) ([ca3ba49](https://github.com/atinc/ngx-tethys/commit/ca3ba4968ad78bc75add6ce09e3424f937b1b016)), closes [#INFR-3823](https://github.com/atinc/ngx-tethys/issues/INFR-3823)
* **menu:** set last thy-action  margin-right: -8px; and group arrow translateX(-2px) for collapsed #INFR-3824 ([#1961](https://github.com/atinc/ngx-tethys/issues/1961)) ([8d9ab3d](https://github.com/atinc/ngx-tethys/commit/8d9ab3d4260bddf7b05bf8c0543b875b8b35681e)), closes [#INFR-3824](https://github.com/atinc/ngx-tethys/issues/INFR-3824)
* **table:** restore tree-padding #INFR-3784 ([10a11c9](https://github.com/atinc/ngx-tethys/commit/10a11c9689550f18b64293b5f73f6a4fc6bc2379)), closes [#INFR-3784](https://github.com/atinc/ngx-tethys/issues/INFR-3784)


### Features

* **table:** add operation space to 32px for operational column in bordered and boxed table #INFR-3825 ([#1960](https://github.com/atinc/ngx-tethys/issues/1960)) ([a9bf90e](https://github.com/atinc/ngx-tethys/commit/a9bf90e8d3bf7933f1f5ba76ea59237c81dac319)), closes [#INFR-3825](https://github.com/atinc/ngx-tethys/issues/INFR-3825)
* **table:** set thy-operation-links nowrap #INFR-3812 ([#1955](https://github.com/atinc/ngx-tethys/issues/1955)) ([b897e62](https://github.com/atinc/ngx-tethys/commit/b897e628700f8bb0db51577ca83201dc11bd8aa9)), closes [#INFR-3812](https://github.com/atinc/ngx-tethys/issues/INFR-3812)



# [13.1.0-next.40](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.39...13.1.0-next.40) (2022-07-07)


### Bug Fixes

* **table:** set thy-avatar display to flex and  align-items: center for name truncate ([#1952](https://github.com/atinc/ngx-tethys/issues/1952)) ([0fa933c](https://github.com/atinc/ngx-tethys/commit/0fa933caadc17a6446dd8411f9871339db6fdcbf))



# [13.1.0-next.39](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.38...13.1.0-next.39) (2022-07-07)


### Bug Fixes

* **empty:** remove class empty-state and line-height for .thy-empty-state #INFR-3793 ([c41b7a8](https://github.com/atinc/ngx-tethys/commit/c41b7a8c20833fe14ffedc5504abc487fd30bb37)), closes [#INFR-3793](https://github.com/atinc/ngx-tethys/issues/INFR-3793)
* **layout:** set min-width to 0px for .thy-layout and content trigger x-scroll in layout--sidebar #INFR-3789 ([#1943](https://github.com/atinc/ngx-tethys/issues/1943)) ([14a59b2](https://github.com/atinc/ngx-tethys/commit/14a59b2b4ed668b6d64e66f4051c7bfa63bf2b33)), closes [#INFR-3789](https://github.com/atinc/ngx-tethys/issues/INFR-3789)
* **notify:** add toOverlayTop to resolve notify is covered issue #INFR-3214 ([c6f654d](https://github.com/atinc/ngx-tethys/commit/c6f654d1696c4888b3ca22fc4c07f11387676911)), closes [#INFR-3214](https://github.com/atinc/ngx-tethys/issues/INFR-3214)
* **table:** update link spacing to 32px for operational column #INFR-3800 ([#1950](https://github.com/atinc/ngx-tethys/issues/1950)) ([1500702](https://github.com/atinc/ngx-tethys/commit/15007025e6ea2d5eb4b059d8ae475969be269c42)), closes [#INFR-3800](https://github.com/atinc/ngx-tethys/issues/INFR-3800)


### Features

* **nav:** add thyNavItemDisabled for nav item #INFR-3791 ([#1947](https://github.com/atinc/ngx-tethys/issues/1947)) ([a53daaa](https://github.com/atinc/ngx-tethys/commit/a53daaa56df943b687d7273b17e3489a07d2efa6)), closes [#INFR-3791](https://github.com/atinc/ngx-tethys/issues/INFR-3791)
* **transfer:** lock has fixed item can not be move to unlock zd/#INFR-3706 ([0a57171](https://github.com/atinc/ngx-tethys/commit/0a571710293217d7facb8a002cbba3c15280d8f5)), closes [zd/#INFR-3706](https://github.com/atinc/ngx-tethys/issues/INFR-3706)



# [13.1.0-next.38](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.37...13.1.0-next.38) (2022-07-06)


### Bug Fixes

* **drag-drop:** remove indicator line when not drag item #INFR-3765 ([#1939](https://github.com/atinc/ngx-tethys/issues/1939)) ([e2cde5a](https://github.com/atinc/ngx-tethys/commit/e2cde5a774ce811a22b81f7b3cde0c2c61a42202)), closes [#INFR-3765](https://github.com/atinc/ngx-tethys/issues/INFR-3765)


### Features

* **menu:** support thyCollapsed event for thy-menu-group #INFR-3766 ([661004f](https://github.com/atinc/ngx-tethys/commit/661004fd71e35968f66d9f37d08c65c411272cb3)), closes [#INFR-3766](https://github.com/atinc/ngx-tethys/issues/INFR-3766)
* **table:** add column minWidth #INFR-3782 ([#1940](https://github.com/atinc/ngx-tethys/issues/1940)) ([e5058aa](https://github.com/atinc/ngx-tethys/commit/e5058aa06d0af1de0f0b8518acbd10fb25b018e2)), closes [#INFR-3782](https://github.com/atinc/ngx-tethys/issues/INFR-3782)



# [13.1.0-next.37](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.36...13.1.0-next.37) (2022-07-04)


### Bug Fixes

* **dot:** fix dot component color options ([#1934](https://github.com/atinc/ngx-tethys/issues/1934)) ([a4f7350](https://github.com/atinc/ngx-tethys/commit/a4f7350bd5779c5dc5184c35fd748f0ce515decd))
* **dropdown:** update dropdown-submenu's shadow as same as popover #INFR-3736 ([#1935](https://github.com/atinc/ngx-tethys/issues/1935)) ([5453537](https://github.com/atinc/ngx-tethys/commit/5453537b7b85e5d1a650f30c024a083adac74a6b)), closes [#INFR-3736](https://github.com/atinc/ngx-tethys/issues/INFR-3736)



# [13.1.0-next.36](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.35...13.1.0-next.36) (2022-07-04)


### Bug Fixes

* **breadcrumb:** update last child icon color to [#999](https://github.com/atinc/ngx-tethys/issues/999) without link and add wrap span for item text node #INFR-3739 ([#1929](https://github.com/atinc/ngx-tethys/issues/1929)) ([e1a276c](https://github.com/atinc/ngx-tethys/commit/e1a276c29003ad4896ad7bacb0a6e9bf847ca341)), closes [#INFR-3739](https://github.com/atinc/ngx-tethys/issues/INFR-3739) [#INFR-3739](https://github.com/atinc/ngx-tethys/issues/INFR-3739)
* **dialog:** update $dialog-body-padding to 0.5rem 2rem 1rem 2rem ([#1932](https://github.com/atinc/ngx-tethys/issues/1932)) ([fd48905](https://github.com/atinc/ngx-tethys/commit/fd489051639d851d34a6f694bea7b8be3897c2ce))
* **table:** keep expand or collapse status for group mode #INFR-3721 ([73b89ff](https://github.com/atinc/ngx-tethys/commit/73b89ff4b2ca7358f86760f830653f49cc1b88d1)), closes [#INFR-3721](https://github.com/atinc/ngx-tethys/issues/INFR-3721)
* **transfer:** change transfer width to 596 #INFR-3735 ([#1928](https://github.com/atinc/ngx-tethys/issues/1928)) ([e53e9c8](https://github.com/atinc/ngx-tethys/commit/e53e9c836cc3bd8a630f5c7c37c3ab97371093cd)), closes [#INFR-3735](https://github.com/atinc/ngx-tethys/issues/INFR-3735)



# [13.1.0-next.35](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.34...13.1.0-next.35) (2022-07-01)


### Bug Fixes

* **breadcrumb:** update suffix icon spacing to 8px ([#1924](https://github.com/atinc/ngx-tethys/issues/1924)) ([62de9dc](https://github.com/atinc/ngx-tethys/commit/62de9dc21390939eee90ebdd0c6f9ede354ee07d))
* **dropdown:** update icon spacing to child combinator and set icon-text spacing without link for breadcrumb-item ([#1919](https://github.com/atinc/ngx-tethys/issues/1919)) ([6e33af7](https://github.com/atinc/ngx-tethys/commit/6e33af765250008a608be95c9c81f5944a209d8c))
* **nav:** update $nav-item-padding-x-sm to  0.625rem ([bc9c82f](https://github.com/atinc/ngx-tethys/commit/bc9c82f6686e58ea96a256baaeb0988d94c4588b))
* **nav:** update sm nav padding-x to 8px and md padding-x to 16px ([#1925](https://github.com/atinc/ngx-tethys/issues/1925)) ([e548186](https://github.com/atinc/ngx-tethys/commit/e5481869053355828b2466e37e44cd9fc18e5a5f))
* **pagination:** fix jump error #INFR-3701 ([#1918](https://github.com/atinc/ngx-tethys/issues/1918)) ([b28d8e5](https://github.com/atinc/ngx-tethys/commit/b28d8e547701fdc5a4a08724393dde0e2489ab6f)), closes [#INFR-3701](https://github.com/atinc/ngx-tethys/issues/INFR-3701)
* **table:** fix table expand for group mode #INFR-3721 ([#1922](https://github.com/atinc/ngx-tethys/issues/1922)) ([e13873a](https://github.com/atinc/ngx-tethys/commit/e13873a47304085c3b360b67ab7181459c632fd7)), closes [#INFR-3721](https://github.com/atinc/ngx-tethys/issues/INFR-3721)


### Features

* **dialog:** uddate dialog paddings and add thyDivided to thy-dialog-header #INFR-3643 ([2f2d632](https://github.com/atinc/ngx-tethys/commit/2f2d6328b950f7a0f1e23f9bb66be1a09b202881)), closes [#INFR-3643](https://github.com/atinc/ngx-tethys/issues/INFR-3643)
* **dot:** add dot component #INFR-3042 ([c281a83](https://github.com/atinc/ngx-tethys/commit/c281a83c3e67262e785772033b93c8321f588120)), closes [#INFR-3042](https://github.com/atinc/ngx-tethys/issues/INFR-3042)



# [13.1.0-next.34](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.33...13.1.0-next.34) (2022-06-29)


### Features

* **slide:** update slide box-shadow and update height of slide-header and sidebar-header to 48px #box-shadow ([#1916](https://github.com/atinc/ngx-tethys/issues/1916)) ([3653a1e](https://github.com/atinc/ngx-tethys/commit/3653a1e15ec9484301b16e9af22c1cc54e18f7ca))



# [13.1.0-next.33](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.32...13.1.0-next.33) (2022-06-29)


### Bug Fixes

* **dialog:** modify supperLg to superLg #INFR-3685 ([#1912](https://github.com/atinc/ngx-tethys/issues/1912)) ([41230e6](https://github.com/atinc/ngx-tethys/commit/41230e606073c84c2e1ac32ed8a22e66f3588b62)), closes [#INFR-3685](https://github.com/atinc/ngx-tethys/issues/INFR-3685)
* **dropdown:** fix hover icon color to dropdown(#INFR-3657) ([#1910](https://github.com/atinc/ngx-tethys/issues/1910)) ([6c595da](https://github.com/atinc/ngx-tethys/commit/6c595da64cbc1a71272cb5f8d4bfeab987132a71)), closes [#INFR-3657](https://github.com/atinc/ngx-tethys/issues/INFR-3657) [#INFR-3657](https://github.com/atinc/ngx-tethys/issues/INFR-3657) [#INFR-3657](https://github.com/atinc/ngx-tethys/issues/INFR-3657)


### Features

* **calendar:** replace calander cell box shadow #INFR-3654 ([#1911](https://github.com/atinc/ngx-tethys/issues/1911)) ([104db8b](https://github.com/atinc/ngx-tethys/commit/104db8bf58469d1494410b06ab1ed8e3c79f70e6)), closes [#INFR-3654](https://github.com/atinc/ngx-tethys/issues/INFR-3654)
* **menu:** add dark theme #INFR-3675 ([a6f6c25](https://github.com/atinc/ngx-tethys/commit/a6f6c25d1c1368084bcb9c407439922ef0a00fe8)), closes [#INFR-3675](https://github.com/atinc/ngx-tethys/issues/INFR-3675)
* **menu:** add thyCollapsed for thy-menu component #INFR-3676 ([63e1449](https://github.com/atinc/ngx-tethys/commit/63e14496184e42686d28e2e5ba3592aab7dea661)), closes [#INFR-3676](https://github.com/atinc/ngx-tethys/issues/INFR-3676)



# [13.1.0-next.32](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.31...13.1.0-next.32) (2022-06-24)


### Bug Fixes

* **breadcrumb:** update icon color of last child to [#999](https://github.com/atinc/ngx-tethys/issues/999) and link with icon space to 8px #INFR-3638 ([48ec512](https://github.com/atinc/ngx-tethys/commit/48ec5127c87c07a166a7e0cb0de84b4e5483f627)), closes [#INFR-3638](https://github.com/atinc/ngx-tethys/issues/INFR-3638)
* **button:** rename IncoShape and sync type define from shapeClassesMap ([#1906](https://github.com/atinc/ngx-tethys/issues/1906)) ([5776d87](https://github.com/atinc/ngx-tethys/commit/5776d87bee5c62e94c2af9d3e8ca8cbccf008f7b))


### Features

* **table:** set table operation column align left ([773c48f](https://github.com/atinc/ngx-tethys/commit/773c48f3b6860a534ee681e9c0dc1ddc670885b9))



# [13.1.0-next.31](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.30...13.1.0-next.31) (2022-06-22)


### Bug Fixes

* **action:** add thyDisabled param #INFR-3602 ([#1899](https://github.com/atinc/ngx-tethys/issues/1899)) ([bbc49f1](https://github.com/atinc/ngx-tethys/commit/bbc49f1a660cfc2f9f9fb3f32854388fb0377de3)), closes [#INFR-3602](https://github.com/atinc/ngx-tethys/issues/INFR-3602) [#INFR-3602](https://github.com/atinc/ngx-tethys/issues/INFR-3602) [#INFR-3602](https://github.com/atinc/ngx-tethys/issues/INFR-3602)
* **button:** fix button component api doc text error ([2180814](https://github.com/atinc/ngx-tethys/commit/21808142df58b2dbcbda614c517050150dccacc8))
* **dropdown:** modify hasBackdrop to always be false #INFR-3615 ([17b88e3](https://github.com/atinc/ngx-tethys/commit/17b88e35017e8f8a31bccfb02e51ee790465ba46)), closes [#INFR-3615](https://github.com/atinc/ngx-tethys/issues/INFR-3615)
* **dropdown:** update menu item color tp [#333](https://github.com/atinc/ngx-tethys/issues/333) #INFR-3611 ([4ed69cd](https://github.com/atinc/ngx-tethys/commit/4ed69cd43078a91c6406418f41d63c28d065df11)), closes [#INFR-3611](https://github.com/atinc/ngx-tethys/issues/INFR-3611)
* **form:** fix form component tab keydown event focus error #INFR-3571 ([#1895](https://github.com/atinc/ngx-tethys/issues/1895)) ([c6f41a6](https://github.com/atinc/ngx-tethys/commit/c6f41a66129317e2d7d24c72f7a4e2f64c211e70)), closes [#INFR-3571](https://github.com/atinc/ngx-tethys/issues/INFR-3571)


### Features

* **action:** add thy-actions convenient for multiple actions usage #INFR-3588 ([78a940e](https://github.com/atinc/ngx-tethys/commit/78a940e12b969723fc354ff35c10cf8b38eea56f)), closes [#INFR-3588](https://github.com/atinc/ngx-tethys/issues/INFR-3588)
* **layout:** add titleTemplateRef at sidebar-header (#INFR-3460) ([#1901](https://github.com/atinc/ngx-tethys/issues/1901)) ([bf58915](https://github.com/atinc/ngx-tethys/commit/bf589158473d97b4dad555642055a0aa05c4ab26)), closes [#INFR-3460](https://github.com/atinc/ngx-tethys/issues/INFR-3460) [#INFR-3460](https://github.com/atinc/ngx-tethys/issues/INFR-3460)



# [13.1.0-next.30](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.29...13.1.0-next.30) (2022-06-20)


### Bug Fixes

* **empty:** update $empty-text-size-lg to 14px and sanitize presetSvg when it is not empty #INFR-3573 ([ef2db52](https://github.com/atinc/ngx-tethys/commit/ef2db52d1d15b595d4da106667f5133cecd3177e)), closes [#INFR-3573](https://github.com/atinc/ngx-tethys/issues/INFR-3573)
* **popover:** use border and update $box-shadow to 0 0 16px rgb(0 0 0 / 8%) try the effect and change it later #INFR-3582 ([f0c9416](https://github.com/atinc/ngx-tethys/commit/f0c9416d95e33da963488d33a5a5cafd2ea71505)), closes [#INFR-3582](https://github.com/atinc/ngx-tethys/issues/INFR-3582)
* **progress:** update primary color to $primary #INFR-3563 ([#1890](https://github.com/atinc/ngx-tethys/issues/1890)) ([35bf07d](https://github.com/atinc/ngx-tethys/commit/35bf07de2e5c7eafb99fbd09f1e7790f28a021df)), closes [#INFR-3563](https://github.com/atinc/ngx-tethys/issues/INFR-3563)
* **table:** update $table-boxed-border-radius to 4px ([#1892](https://github.com/atinc/ngx-tethys/issues/1892)) ([c2441be](https://github.com/atinc/ngx-tethys/commit/c2441be802789aa353028b17659bd1403f97fe72))


### Features

* **action:** add thyHoverIcon support hover switch diff icon and add thyIcon, thyActive instead of thyActionIcon, thyActionActive #INFR-3569 ([02d816a](https://github.com/atinc/ngx-tethys/commit/02d816a77975690a16e2db29fbc05fe9c89baf1e)), closes [#INFR-3569](https://github.com/atinc/ngx-tethys/issues/INFR-3569)
* **dropdown:** update default value of placement to bottomLeft and fix some test cases #INFR-3580 ([#1894](https://github.com/atinc/ngx-tethys/issues/1894)) ([7f7452a](https://github.com/atinc/ngx-tethys/commit/7f7452a007b4d4829a9ab906433143720e847b38)), closes [#INFR-3580](https://github.com/atinc/ngx-tethys/issues/INFR-3580)



# [13.1.0-next.29](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.28...13.1.0-next.29) (2022-06-17)


### Bug Fixes

* **table:** fix table ngclass syntax error and add min-width docs ([890df0f](https://github.com/atinc/ngx-tethys/commit/890df0fdf7655ac7d5433579eb0cd825133e9eca))



# [13.1.0-next.28](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.27...13.1.0-next.28) (2022-06-17)


### Bug Fixes

* **breadcrumb:** add icon spacing 4px for first-child and last-child ([a1664c5](https://github.com/atinc/ngx-tethys/commit/a1664c5dc8ac249cedd803935a6b61e89b06a83a))
* **input:** update $input-icon-color to $gray-400(#cacaca) and update search icon size to 14px #INFR-3560 ([#1885](https://github.com/atinc/ngx-tethys/issues/1885)) ([eecb6c6](https://github.com/atinc/ngx-tethys/commit/eecb6c657f473526734b0da3c4331457144656e6)), closes [#INFR-3560](https://github.com/atinc/ngx-tethys/issues/INFR-3560)
* **menu:** fix menu style ([35adcea](https://github.com/atinc/ngx-tethys/commit/35adcea4c9745a12b20c47f9e8dbaeb37b68865a))
* **progress:** set progress bar min width #INFR-3559 ([#1883](https://github.com/atinc/ngx-tethys/issues/1883)) ([a19d88c](https://github.com/atinc/ngx-tethys/commit/a19d88c8e297e8004723a160e490f11f29d14c63)), closes [#INFR-3559](https://github.com/atinc/ngx-tethys/issues/INFR-3559) [zd/#INFR-3559](https://github.com/atinc/ngx-tethys/issues/INFR-3559) [zd/#INFR-3559](https://github.com/atinc/ngx-tethys/issues/INFR-3559)
* **table:** fix table header input-element be default action #INFR-3544 ([54aa277](https://github.com/atinc/ngx-tethys/commit/54aa277e5a6a156d2836e443715a1e58afa7b48a)), closes [#INFR-3544](https://github.com/atinc/ngx-tethys/issues/INFR-3544)


### Features

* **action:** add thyTheme support fill and lite #INFR-3562 ([#1884](https://github.com/atinc/ngx-tethys/issues/1884)) ([3ce39dd](https://github.com/atinc/ngx-tethys/commit/3ce39ddd36b8bf2be2a0203fca32f79fa2a44ccf)), closes [#INFR-3562](https://github.com/atinc/ngx-tethys/issues/INFR-3562)
* **table:** add thyMinWidth and thyLayoutFixed for thy-table #INFR-3561 #INFR-3547 ([#1882](https://github.com/atinc/ngx-tethys/issues/1882)) ([8a0b31f](https://github.com/atinc/ngx-tethys/commit/8a0b31fd48b85ce879ed41984d6af5f3342dab28)), closes [#INFR-3561](https://github.com/atinc/ngx-tethys/issues/INFR-3561) [#INFR-3547](https://github.com/atinc/ngx-tethys/issues/INFR-3547)



# [13.1.0-next.27](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.26...13.1.0-next.27) (2022-06-17)


### Bug Fixes

* **alert:** delete alert margin bottom INFR-3546 ([#1877](https://github.com/atinc/ngx-tethys/issues/1877)) ([f6be040](https://github.com/atinc/ngx-tethys/commit/f6be0404cb84889f95879aebf42eb9a4b981a4b0))
* **divider:** remove  top: -0.06em for thy-divider-vertical ([0abe37c](https://github.com/atinc/ngx-tethys/commit/0abe37c244e0a6a059f0cca4c05eeda7e096b16b))



# [13.1.0-next.26](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.25...13.1.0-next.26) (2022-06-16)


### Bug Fixes

* **tag:** update padding-x to 12px for lg tag ([d410ef6](https://github.com/atinc/ngx-tethys/commit/d410ef671fd2f0dd860a54ba98b40185709d8314))


### Features

* **alert:** add thyTheme support 'fill' | 'bordered' | 'naked' ([#1867](https://github.com/atinc/ngx-tethys/issues/1867)) ([919e986](https://github.com/atinc/ngx-tethys/commit/919e98656c3cdc9664e2cceeae9fd777f9cd214c))



# [13.1.0-next.25](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.24...13.1.0-next.25) (2022-06-16)


### Bug Fixes

* **table:** fix dynamic update column property not work bug  and refactor columns initialize #INFR-3440  ([#1872](https://github.com/atinc/ngx-tethys/issues/1872)) ([7d6d44a](https://github.com/atinc/ngx-tethys/commit/7d6d44ad2451bcb3ca6763eec2a0a22ebf872a98)), closes [#INFR-3440](https://github.com/atinc/ngx-tethys/issues/INFR-3440)
* **table:** update padding-x to 16px for all sizes and update vertical-align for align sort icon with text #INFR-3542 ([147aace](https://github.com/atinc/ngx-tethys/commit/147aacec98109304f34bb8ea4c17b6565af08e0d)), closes [#INFR-3542](https://github.com/atinc/ngx-tethys/issues/INFR-3542)


### Features

* **tag:** #INFR-3541 update padding-y to 16px for lg size ([fc9432f](https://github.com/atinc/ngx-tethys/commit/fc9432f38e69215772b4b0a89c13eb2b9023dcab)), closes [#INFR-3541](https://github.com/atinc/ngx-tethys/issues/INFR-3541)



# [13.1.0-next.24](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.23...13.1.0-next.24) (2022-06-16)


### Bug Fixes

* **button:** update only-icon size to same as button in button-group #INFR-3502 ([8273beb](https://github.com/atinc/ngx-tethys/commit/8273beb2a8f248062ecf3c7378e2b216cc0c89e5)), closes [#INFR-3502](https://github.com/atinc/ngx-tethys/issues/INFR-3502)
* **table:** fix table sort icon style #INFR-3520 ([b195400](https://github.com/atinc/ngx-tethys/commit/b195400f958864e2b9ff9acd713221b2b260c88d)), closes [#INFR-3520](https://github.com/atinc/ngx-tethys/issues/INFR-3520)


### Features

* **dropdown:** support sub menu vertical direction (#INFR-3081) ([595b845](https://github.com/atinc/ngx-tethys/commit/595b8457186f34da1049674e386c1b9e39d352d2)), closes [#INFR-3081](https://github.com/atinc/ngx-tethys/issues/INFR-3081)
* **table:** add thySecondary for thy-table-column that add thy-table-column-secondary class to column and update default table header color to $gray-700 #INFR-3533 ([f7f6610](https://github.com/atinc/ngx-tethys/commit/f7f6610dbaf582b700fe26b0d0e29960da283583)), closes [#INFR-3533](https://github.com/atinc/ngx-tethys/issues/INFR-3533)
* **table:** update padding-y to 24px for md size #INFR-3529 ([b334cca](https://github.com/atinc/ngx-tethys/commit/b334cca76ff0f29d8d8dcbe492c0b65a469393cf)), closes [#INFR-3529](https://github.com/atinc/ngx-tethys/issues/INFR-3529)



# [13.1.0-next.23](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.22...13.1.0-next.23) (2022-06-14)


### Features

* **empty:** update default svg icon #INFR-3509 ([#1862](https://github.com/atinc/ngx-tethys/issues/1862)) ([4366038](https://github.com/atinc/ngx-tethys/commit/4366038e46bdb2f222a605a6558234f2ebe72b29)), closes [#INFR-3509](https://github.com/atinc/ngx-tethys/issues/INFR-3509) [#INFR-3509](https://github.com/atinc/ngx-tethys/issues/INFR-3509)



# [13.1.0-next.22](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.21...13.1.0-next.22) (2022-06-14)


### Bug Fixes

* **link:** remove thy-icon padding in link, continue to use class link-has-icon ([186d62e](https://github.com/atinc/ngx-tethys/commit/186d62e8ddd8fb97f2ca620515d1691e5e022832))



# [13.1.0-next.21](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.20...13.1.0-next.21) (2022-06-14)


### Bug Fixes

* **menu:** fix menu component style #INFR-3229 ([#1858](https://github.com/atinc/ngx-tethys/issues/1858)) ([4a441ea](https://github.com/atinc/ngx-tethys/commit/4a441ea03c9d9b8d6ece0633948e307e3ef4d91a)), closes [#INFR-3229](https://github.com/atinc/ngx-tethys/issues/INFR-3229)



# [13.1.0-next.20](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.19...13.1.0-next.20) (2022-06-14)


### Features

* **menu:** support thyIcon for thy-menu-item and refacor api doc and examples [#1851](https://github.com/atinc/ngx-tethys/issues/1851) ([0918989](https://github.com/atinc/ngx-tethys/commit/0918989a805e52715a1a148fdbcd0be1d1b00ddb))
* **select:** custom select add thyAutoActiveFirstItem params #INFR-3485 ([#1844](https://github.com/atinc/ngx-tethys/issues/1844)) ([dc73db7](https://github.com/atinc/ngx-tethys/commit/dc73db744d347ce136d9172812fc53f72f0e194d)), closes [#INFR-3485](https://github.com/atinc/ngx-tethys/issues/INFR-3485)
* **table:** add thyOperational for thy-table-column and set text-align: center for thy-operation-links #INFR-3499 ([0ceee89](https://github.com/atinc/ngx-tethys/commit/0ceee89d2149a5097ded588728c44d2a394b6adb)), closes [#INFR-3499](https://github.com/atinc/ngx-tethys/issues/INFR-3499)
* **table:** expand the clickable area of table sort to the whole column header #INFR-3466 ([1f740d1](https://github.com/atinc/ngx-tethys/commit/1f740d17b56c5ee3fe9799764f0ad11581adc9fa)), closes [#INFR-3466](https://github.com/atinc/ngx-tethys/issues/INFR-3466)
* **table:** support boxed theme #INFR-3489 ([#1854](https://github.com/atinc/ngx-tethys/issues/1854)) ([c1e2941](https://github.com/atinc/ngx-tethys/commit/c1e294162943226f70455b383dbd59597200b447)), closes [#INFR-3489](https://github.com/atinc/ngx-tethys/issues/INFR-3489)



# [13.1.0-next.19](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.18...13.1.0-next.19) (2022-06-13)


### Features

* **badge:** add thyContent instead of thyContext and refactor UI Design ([f1cf9a9](https://github.com/atinc/ngx-tethys/commit/f1cf9a99c957919955c9c1b2f6df11ee6a30bf86))
* **breadcrumb:** add vertical-line of thySeparator and update last link hover color to primary #INFR-3474 ([#1845](https://github.com/atinc/ngx-tethys/issues/1845)) ([a249c22](https://github.com/atinc/ngx-tethys/commit/a249c22651d0bed8cca07efad28d45ded56715af)), closes [#INFR-3474](https://github.com/atinc/ngx-tethys/issues/INFR-3474) [#INFR-3474](https://github.com/atinc/ngx-tethys/issues/INFR-3474)
* **button:** update text color of default to $gray-700([#666](https://github.com/atinc/ngx-tethys/issues/666)) #INFR-3303 ([aa9900f](https://github.com/atinc/ngx-tethys/commit/aa9900fe731283ba4a84cefc21cdaa9702d6ebf0)), closes [#INFR-3303](https://github.com/atinc/ngx-tethys/issues/INFR-3303)
* **link:** add active class for link and update spacing and size for thy-icon:first-child without link-has-icon #INFR-3481 ([cd2fe32](https://github.com/atinc/ngx-tethys/commit/cd2fe320805fad5de37e5d82e23fcd313f588f1f)), closes [#INFR-3481](https://github.com/atinc/ngx-tethys/issues/INFR-3481)
* **table:** add xlg of size height 64px and update font-size of sidebar header title tp 15px #INFR-3488 ([ef05237](https://github.com/atinc/ngx-tethys/commit/ef052374d878c741a41cadc4eb475a70ae4879d9)), closes [#INFR-3488](https://github.com/atinc/ngx-tethys/issues/INFR-3488)
* **tag:** update md and lg padding x to 12px #INFR-3494 ([9b3f57e](https://github.com/atinc/ngx-tethys/commit/9b3f57eb6c6ea237edec3135013445d03793fa62)), closes [#INFR-3494](https://github.com/atinc/ngx-tethys/issues/INFR-3494)



# [13.1.0-next.18](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.17...13.1.0-next.18) (2022-06-10)


### Bug Fixes

* **table:** set px-1 to sort icon #INFR-3459 ([d7fe3a2](https://github.com/atinc/ngx-tethys/commit/d7fe3a265620a8aba7f742caabb7ebfd5668f2ca)), closes [#INFR-3459](https://github.com/atinc/ngx-tethys/issues/INFR-3459)



# [13.1.0-next.17](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.16...13.1.0-next.17) (2022-06-10)


### Bug Fixes

* **segment:** fix quickly click the same item twice bug #INFR-3444 ([6516b4b](https://github.com/atinc/ngx-tethys/commit/6516b4beb3471804efc01cd9c1ae7cbf1998dd7e)), closes [#INFR-3444](https://github.com/atinc/ngx-tethys/issues/INFR-3444)


### Features

* **card:** update card size #INFR-3455 ([d16f11f](https://github.com/atinc/ngx-tethys/commit/d16f11f9f7d1d0610b7ae26a4a46db73de3c4fe2)), closes [#INFR-3455](https://github.com/atinc/ngx-tethys/issues/INFR-3455)



# [13.1.0-next.16](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.15...13.1.0-next.16) (2022-06-09)


### Features

* **styles:** update margin-left of prefix-icon title-name to 8px and menu-group-header font-size to 12px #INFR-3443 ([18a7be3](https://github.com/atinc/ngx-tethys/commit/18a7be3b0e5ea7d435b319f7ae35cdbf3d2434e8)), closes [#INFR-3443](https://github.com/atinc/ngx-tethys/issues/INFR-3443)



# [13.1.0-next.15](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.14...13.1.0-next.15) (2022-06-09)


### Bug Fixes

* **dropdown:** update isClass to isFunction for menu component ([c2ca9b2](https://github.com/atinc/ngx-tethys/commit/c2ca9b2ab5e10934305e610571f6167cf2a5f578))


### Features

* **dropdown:** support templateRef and ComponentType for thyDropdown and thyDropdownMenu #INFR-3434 [#1827](https://github.com/atinc/ngx-tethys/issues/1827) ([#1830](https://github.com/atinc/ngx-tethys/issues/1830)) ([f7f6b3f](https://github.com/atinc/ngx-tethys/commit/f7f6b3f93a5a1043bfef1506b395ee5e5419d9c2)), closes [#INFR-3434](https://github.com/atinc/ngx-tethys/issues/INFR-3434)
* **layout:** update color of thy-icon in title-name to $gray-600 ([df7f886](https://github.com/atinc/ngx-tethys/commit/df7f88637ce04143ca44d614ab7eb0d65108abe1))
* **styles:** adjust icon-text margin to 8px #INFR-3435 ([ea49836](https://github.com/atinc/ngx-tethys/commit/ea498369c4d5cfb9a1df9ca120ee158af2f20a51)), closes [#INFR-3435](https://github.com/atinc/ngx-tethys/issues/INFR-3435)



# [13.1.0-next.14](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.13...13.1.0-next.14) (2022-06-08)


### Bug Fixes

* **table:** update table header color to [#333](https://github.com/atinc/ngx-tethys/issues/333) #INFR-3430 ([d1e6e1f](https://github.com/atinc/ngx-tethys/commit/d1e6e1fe00432342233a6714fd131ebc971a62c3)), closes [#INFR-3430](https://github.com/atinc/ngx-tethys/issues/INFR-3430)


### Features

* **dropdown:** use thy-divider instead of thy-dropdown-menu-divider,update margin for it in menu #INFR-3429 [#1822](https://github.com/atinc/ngx-tethys/issues/1822) ([#1823](https://github.com/atinc/ngx-tethys/issues/1823)) ([181ec5e](https://github.com/atinc/ngx-tethys/commit/181ec5e784ac85b607a86579d9869b01bc238edf)), closes [#INFR-3429](https://github.com/atinc/ngx-tethys/issues/INFR-3429)



# [13.1.0-next.13](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.12...13.1.0-next.13) (2022-06-08)


### Bug Fixes

* **menu:** delete menu padding and transform #INFR-3389 ([ac160e7](https://github.com/atinc/ngx-tethys/commit/ac160e73aca0a228e19b230a670835198051fff7)), closes [#INFR-3389](https://github.com/atinc/ngx-tethys/issues/INFR-3389)
* **tag:** remove focus style and update lightness to -5% for hover ([ebb4674](https://github.com/atinc/ngx-tethys/commit/ebb4674a76994cc3936e3f553a7c3ffed4a6d506))


### Features

* **dropdown:** add border-radius of popover menu to 4px(#INFR-3384) ([#1818](https://github.com/atinc/ngx-tethys/issues/1818)) ([ab1341e](https://github.com/atinc/ngx-tethys/commit/ab1341e19a40b1f8e53b15aba88ada1f8477b53e)), closes [#INFR-3384](https://github.com/atinc/ngx-tethys/issues/INFR-3384)



# [13.1.0-next.12](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.11...13.1.0-next.12) (2022-06-08)


### Bug Fixes

* **tree:** 在safari等有些版本的浏览器下，出现横向滚动条 #INFR-3408  ([f912b45](https://github.com/atinc/ngx-tethys/commit/f912b45e3ead45c7b64453c128f1aec1941d774e)), closes [#INFR-3408](https://github.com/atinc/ngx-tethys/issues/INFR-3408)


### Features

* #INFR-3394 【Tree】移入展开收起箭头颜色默认为 [#999999](https://github.com/atinc/ngx-tethys/issues/999999) 移入以后改为 [#666666](https://github.com/atinc/ngx-tethys/issues/666666) ([45f759d](https://github.com/atinc/ngx-tethys/commit/45f759d5246975aa3a08077693c2741c1fee6ac9)), closes [#INFR-3394](https://github.com/atinc/ngx-tethys/issues/INFR-3394)
* **avatar:** update margin-left of avatar-name to 8px #INFR-3416 ([#1815](https://github.com/atinc/ngx-tethys/issues/1815)) ([7330702](https://github.com/atinc/ngx-tethys/commit/7330702a561242dddac231de949ed2f897badb6a)), closes [#INFR-3416](https://github.com/atinc/ngx-tethys/issues/INFR-3416)
* **card:** card support set thyBordered #INFR-3410 ([5360dc4](https://github.com/atinc/ngx-tethys/commit/5360dc4d2a0cf1e593b983bef8568f7f83387c27)), closes [#INFR-3410](https://github.com/atinc/ngx-tethys/issues/INFR-3410)
* **card:** change card's border radius to 2px #INFR-3393 ([#1808](https://github.com/atinc/ngx-tethys/issues/1808)) ([002d6ec](https://github.com/atinc/ngx-tethys/commit/002d6ec0311a7e0503978ac137b352e6ef172bce)), closes [#INFR-3393](https://github.com/atinc/ngx-tethys/issues/INFR-3393) [#INFR-3393](https://github.com/atinc/ngx-tethys/issues/INFR-3393) [#INFR-3393](https://github.com/atinc/ngx-tethys/issues/INFR-3393)
* **layout:** change layout content section margin bottom to 12px #INFR-3405 ([21da8e5](https://github.com/atinc/ngx-tethys/commit/21da8e5571205307a88414bac1117a15522dd74b)), closes [#INFR-3405](https://github.com/atinc/ngx-tethys/issues/INFR-3405)
* **layout:** change layout content section margin bottom to 8px #INFR-3405 ([7e67c82](https://github.com/atinc/ngx-tethys/commit/7e67c82ba77ba033f097b3b4414708038cf59f04)), closes [#INFR-3405](https://github.com/atinc/ngx-tethys/issues/INFR-3405)
* **segment:** adjust segment padding for block mode #INFR-3073 ([4f3d0b0](https://github.com/atinc/ngx-tethys/commit/4f3d0b00a453955b29ca11196642fe5f21100e26)), closes [#INFR-3073](https://github.com/atinc/ngx-tethys/issues/INFR-3073)
* **segment:** remove segment item padding for block mode #INFR-3073 ([af1665b](https://github.com/atinc/ngx-tethys/commit/af1665bafa41997dddb38aa9242af883e4e6584c)), closes [#INFR-3073](https://github.com/atinc/ngx-tethys/issues/INFR-3073)
* **tag:** add thy-tag component #INFR-3415 [#1813](https://github.com/atinc/ngx-tethys/issues/1813) ([#1814](https://github.com/atinc/ngx-tethys/issues/1814)) ([f658b1d](https://github.com/atinc/ngx-tethys/commit/f658b1d6504a5bd1ea56852f28fe95f1169ce944)), closes [#INFR-3415](https://github.com/atinc/ngx-tethys/issues/INFR-3415)
* **tree:** ThyTreeNodeData adds itemClass  parameters to expose the ability to inject classnames into different levels of a single node node #INFR-3402 ([563661c](https://github.com/atinc/ngx-tethys/commit/563661c784742391eecaceee06c39b8ce7fee969)), closes [#INFR-3402](https://github.com/atinc/ngx-tethys/issues/INFR-3402) [#INFR-3402](https://github.com/atinc/ngx-tethys/issues/INFR-3402)



# [13.1.0-next.11](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.10...13.1.0-next.11) (2022-06-07)


### Bug Fixes

* **segment:** fix ng-package.json for segment module #INFR-3073 ([#1802](https://github.com/atinc/ngx-tethys/issues/1802)) ([ca461b9](https://github.com/atinc/ngx-tethys/commit/ca461b9140e6c9b6d4769fc18ba2dd28306b3c3a)), closes [#INFR-3073](https://github.com/atinc/ngx-tethys/issues/INFR-3073)



# [13.1.0-next.10](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.9...13.1.0-next.10) (2022-06-07)


### Bug Fixes

* **action:** fix action text color not change when thyActonActive is true ([ea9ad0a](https://github.com/atinc/ngx-tethys/commit/ea9ad0ab8afcd299025ebaee3f9a0459c422b81a))
* **layout:** change layout sidebar transition all to width #INFR-3399 ([#1797](https://github.com/atinc/ngx-tethys/issues/1797)) ([0d350df](https://github.com/atinc/ngx-tethys/commit/0d350df6896bdf0ca7c7a7476cf84072c6652385)), closes [#INFR-3399](https://github.com/atinc/ngx-tethys/issues/INFR-3399)


### Features

* **divider:** add thyColor as ['default', 'light', 'danger', 'primary', 'success', 'warning'] #INFR-3383 ([#1798](https://github.com/atinc/ngx-tethys/issues/1798)) ([8f85755](https://github.com/atinc/ngx-tethys/commit/8f857559f27adf106bf2bba1bc9d95fa8b2db9f6)), closes [#INFR-3383](https://github.com/atinc/ngx-tethys/issues/INFR-3383)
* **segment:** add segment module and component #INFR-3073 ([#1775](https://github.com/atinc/ngx-tethys/issues/1775)) ([b36e694](https://github.com/atinc/ngx-tethys/commit/b36e694f1e23333d82e95b1080c39635e42c2d78)), closes [#INFR-3073](https://github.com/atinc/ngx-tethys/issues/INFR-3073)
* **segment:** add segment module and component #INFR-3073 ([#1799](https://github.com/atinc/ngx-tethys/issues/1799)) ([420d520](https://github.com/atinc/ngx-tethys/commit/420d52034efc717ffc080245800c815f948be8d2)), closes [#INFR-3073](https://github.com/atinc/ngx-tethys/issues/INFR-3073)
* **styles:** add bg-content(#fafafa) to background utils ([31ce76e](https://github.com/atinc/ngx-tethys/commit/31ce76eefcb7f753d782edf89629e415473bc315))



# [13.1.0-next.9](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.8...13.1.0-next.9) (2022-06-02)


### Features

* **styles:** add bg-lighter(#f5f5f5) and bg-bright(#fafafa) utils ([167ee3a](https://github.com/atinc/ngx-tethys/commit/167ee3a11a3f4d03f92e5c450158b98730a971b2)), closes [#f5f5f5](https://github.com/atinc/ngx-tethys/issues/f5f5f5)
* **styles:** add justify-content-evenly to flex ([2161403](https://github.com/atinc/ngx-tethys/commit/21614032c6dc69d4398490901c73d2bc0d09691c))
* **table:** adjust table header text color & table column sort icon style #INFR-3386 ([da94a67](https://github.com/atinc/ngx-tethys/commit/da94a67475d0a5eaa9430291e7c5cdbf70ca18b8)), closes [#INFR-3386](https://github.com/atinc/ngx-tethys/issues/INFR-3386)



# [13.1.0-next.8](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.7...13.1.0-next.8) (2022-06-02)


### Features

* **dropdown:** add thyActiveClass for active origin class, default is  thy-dropdown-origin-active #INFR-3380 ([1fdc10b](https://github.com/atinc/ngx-tethys/commit/1fdc10bbd977761a2417cd0471daa317aa7f3e4e)), closes [#INFR-3380](https://github.com/atinc/ngx-tethys/issues/INFR-3380)
* **nav:** update icon-nav size and color to 32px and  999  and add warnDeprecation for thy-icon-nav [#1787](https://github.com/atinc/ngx-tethys/issues/1787) #INFR-3378 ([1e57caa](https://github.com/atinc/ngx-tethys/commit/1e57caa7137509eaae49dd24591df2f69088f9ea)), closes [#INFR-3378](https://github.com/atinc/ngx-tethys/issues/INFR-3378)
* **util:** add assertIconOnly function that assert a wrapper element whether only contains icon and refactor buttom use it #INFR-3375 [#1785](https://github.com/atinc/ngx-tethys/issues/1785) ([6b5ec91](https://github.com/atinc/ngx-tethys/commit/6b5ec915238139a9b6f0565758dab38987ab1e13)), closes [#INFR-3375](https://github.com/atinc/ngx-tethys/issues/INFR-3375)



# [13.1.0-next.7](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.6...13.1.0-next.7) (2022-06-01)


### Bug Fixes

* **layout:** remove thyCollapsed change emit in set accessor #INFR-3255 ([#1781](https://github.com/atinc/ngx-tethys/issues/1781)) ([e27bd3f](https://github.com/atinc/ngx-tethys/commit/e27bd3fd7bc860205fe8a658b3724bff954b950b)), closes [#INFR-3255](https://github.com/atinc/ngx-tethys/issues/INFR-3255)
* **table:** table column sort sortDirections add 'null' ([#1777](https://github.com/atinc/ngx-tethys/issues/1777)) ([5bee45b](https://github.com/atinc/ngx-tethys/commit/5bee45b102d056d428ff54c5406e80b463f6c629))



# [13.1.0-next.6](https://github.com/atinc/ngx-tethys/compare/12.1.33...13.1.0-next.6) (2022-06-01)


### Features

* **action:** add thyType for action(#INFR-3243) ([89f042d](https://github.com/atinc/ngx-tethys/commit/89f042dfb1794eea08252231af619139665451b6)), closes [#INFR-3243](https://github.com/atinc/ngx-tethys/issues/INFR-3243)
* **action:** update action-text color to [#666](https://github.com/atinc/ngx-tethys/issues/666)(#INFR-3294) ([489ebc1](https://github.com/atinc/ngx-tethys/commit/489ebc18f656db0bd917e37e4ebc9523d64c5a8d)), closes [#INFR-3294](https://github.com/atinc/ngx-tethys/issues/INFR-3294)
* **card:** add size sm and lg to thy-card #INFR-3305 ([#1779](https://github.com/atinc/ngx-tethys/issues/1779)) ([3c17867](https://github.com/atinc/ngx-tethys/commit/3c178676b5654b4d6c87fda4d6917403f8eb1ca0)), closes [#INFR-3305](https://github.com/atinc/ngx-tethys/issues/INFR-3305)
* **input:** add prefix and suffix template to thy-input-group instead if thy-input append and prepend #INFR-3292 ([40d40e6](https://github.com/atinc/ngx-tethys/commit/40d40e6e7fdd418bbba55854391fbcdfa806a439)), closes [#INFR-3292](https://github.com/atinc/ngx-tethys/issues/INFR-3292)
* **input:** add transparent to thyTheme for thy-input-search #INFR-3304 ([ba9ac4b](https://github.com/atinc/ngx-tethys/commit/ba9ac4baa98b60e9ff8dd83b64c19d0a1f6ababb)), closes [#INFR-3304](https://github.com/atinc/ngx-tethys/issues/INFR-3304)
* **table:** add lg, md, sm, xs sizes for table and update spacing #INFR-3306 ([8f73a71](https://github.com/atinc/ngx-tethys/commit/8f73a71a4fe946ba68a9e17e337e666782edf6b7)), closes [#INFR-3306](https://github.com/atinc/ngx-tethys/issues/INFR-3306)
* **table:** table component support header sort #INFR-3237 ([#1762](https://github.com/atinc/ngx-tethys/issues/1762)) ([34dc042](https://github.com/atinc/ngx-tethys/commit/34dc0424119e4aa67821036b8ddcbed47e4614b0)), closes [#INFR-3237](https://github.com/atinc/ngx-tethys/issues/INFR-3237)


### Reverts

* Revert "Merge branch 'v12.x' into master (#1766)" ([5c5d405](https://github.com/atinc/ngx-tethys/commit/5c5d4053d29b3517a38eb993a18663a63ba26ddd)), closes [#1766](https://github.com/atinc/ngx-tethys/issues/1766)



# [13.1.0-next.5](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.4...13.1.0-next.5) (2022-05-31)


### Features

* **styles:** add spacers 8,9,10(32px,36px,40px), and improve negative margin docs ([39b947b](https://github.com/atinc/ngx-tethys/commit/39b947b7d288054d9600380d10033e34ad5262ed))



# [13.1.0-next.4](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.3...13.1.0-next.4) (2022-05-30)


### Features

* **action:** update x of action-padding to 0.5rem #INFR-3285 ([cafc1e8](https://github.com/atinc/ngx-tethys/commit/cafc1e8f9ffb492a022107a96d7f456ae1266536)), closes [#INFR-3285](https://github.com/atinc/ngx-tethys/issues/INFR-3285)
* **layout:** add thy-sidebar-content component with sidebar-content class and refactor header sizes [#1755](https://github.com/atinc/ngx-tethys/issues/1755) ([#1756](https://github.com/atinc/ngx-tethys/issues/1756)) ([a4479bc](https://github.com/atinc/ngx-tethys/commit/a4479bcc72a8ca6a979a83a95c9c9569674794e5))



# [13.1.0-next.3](https://github.com/atinc/ngx-tethys/compare/13.0.1...13.1.0-next.3) (2022-05-30)


### Bug Fixes

* **menu:** change menu theme name and group params #INFR-3277 ([6b6578f](https://github.com/atinc/ngx-tethys/commit/6b6578fdaf38f4aa7e085e0a3ebb495678e36bd8)), closes [#INFR-3277](https://github.com/atinc/ngx-tethys/issues/INFR-3277)



## [13.0.1](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.2...13.0.1) (2022-05-30)


### Features

* **styles:** update spacer to 0-7(4px、8px、12px、16px、20px、24px、28px) and update space component apply to it, refactor styles doc ([#1748](https://github.com/atinc/ngx-tethys/issues/1748)) ([3bb0bbd](https://github.com/atinc/ngx-tethys/commit/3bb0bbd2bcb00bd0978a11e1524eb2c30785e778))



# [13.1.0-next.2](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.1...13.1.0-next.2) (2022-05-27)


### Features

* **menu:** menu suport divide theme #INFR-3229 ([2f6930e](https://github.com/atinc/ngx-tethys/commit/2f6930edf7fdaa7fb46bf3fbe05f19d949e7395b)), closes [#INFR-3229](https://github.com/atinc/ngx-tethys/issues/INFR-3229)



# [13.1.0-next.1](https://github.com/atinc/ngx-tethys/compare/12.1.32...13.1.0-next.1) (2022-05-27)


### Features

* update nav and thy-header size and refactor styles ([#1741](https://github.com/atinc/ngx-tethys/issues/1741)) ([f86c73e](https://github.com/atinc/ngx-tethys/commit/f86c73ec7b93c155e295710bf5e571199b9c316a))



# [13.1.0-next.0](https://github.com/atinc/ngx-tethys/compare/13.0.0...13.1.0-next.0) (2022-05-27)


### Features

* **action:** add thy-action compoent #INFR-3240 [#1729](https://github.com/atinc/ngx-tethys/issues/1729) ([921abc6](https://github.com/atinc/ngx-tethys/commit/921abc6a5c01ce82408ff444a1ade169c84344af)), closes [#INFR-3240](https://github.com/atinc/ngx-tethys/issues/INFR-3240)
* **layout:** add thy-sidebar-header and thy-sidebar-footer, add thyTheme input to thy-sidebar, refactor styles (#INFR-3226) ([#1728](https://github.com/atinc/ngx-tethys/issues/1728)) ([0e6a5e9](https://github.com/atinc/ngx-tethys/commit/0e6a5e9db91b18972b484ed3008cb0b91ff984e8)), closes [#INFR-3226](https://github.com/atinc/ngx-tethys/issues/INFR-3226)



# [13.0.0](https://github.com/atinc/ngx-tethys/compare/12.1.31...13.0.0) (2022-05-23)



# [13.0.0-next.8](https://github.com/atinc/ngx-tethys/compare/12.1.30...13.0.0-next.8) (2022-05-20)


### Bug Fixes

* **schematics:** fix order migrations ([8aeeefc](https://github.com/atinc/ngx-tethys/commit/8aeeefc97a20b5e2ad5206b3eafcafa65a4fc01e))



# [13.0.0-next.6](https://github.com/atinc/ngx-tethys/compare/12.1.28...13.0.0-next.6) (2022-05-19)


### Bug Fixes

* **schematics:** fix path when import Action from ngx-tethys ([6c168cf](https://github.com/atinc/ngx-tethys/commit/6c168cf543c93bb128f7c419e07dd57b4c1921e0))
* **styles:** use -nav-link-padding-y by variables fix errors and add Sass desc in migration-v13 ([#1698](https://github.com/atinc/ngx-tethys/issues/1698)) ([8d33df9](https://github.com/atinc/ngx-tethys/commit/8d33df9a7bdd6a89f4711002ae1fbcfdbc01f981))


### Features

* **button:** remove deprecated @Input thySquare, the default type is already square [#1686](https://github.com/atinc/ngx-tethys/issues/1686) #INFR-3125 ([#1687](https://github.com/atinc/ngx-tethys/issues/1687)) ([390d8aa](https://github.com/atinc/ngx-tethys/commit/390d8aa890f61b327fd9e2e96742cde341c940c9)), closes [#INFR-3125](https://github.com/atinc/ngx-tethys/issues/INFR-3125) [#INFR-3125](https://github.com/atinc/ngx-tethys/issues/INFR-3125)



# [13.0.0-next.5](https://github.com/atinc/ngx-tethys/compare/12.1.27...13.0.0-next.5) (2022-05-17)


### Bug Fixes

* **schematics:** fix import error when has alias #INFR-2685 ([98c085f](https://github.com/atinc/ngx-tethys/commit/98c085f1b31c87e265758bc4de01b217ccd420c0)), closes [#INFR-2685](https://github.com/atinc/ngx-tethys/issues/INFR-2685)


### Features

* **styles:** export all mixin use forward #INFR-3124 [#1683](https://github.com/atinc/ngx-tethys/issues/1683) ([e126f00](https://github.com/atinc/ngx-tethys/commit/e126f00d4ba11b5dc065c9489560c1756baaebcd)), closes [#INFR-3124](https://github.com/atinc/ngx-tethys/issues/INFR-3124)



# [13.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.3...13.0.0-next.4) (2022-05-13)


### Features

* **markdown:** remove markdown component and some js assets #INFR-1638 ([243407e](https://github.com/atinc/ngx-tethys/commit/243407e819a07a5e8fb2bba06d74f1503470f6cc)), closes [#INFR-1638](https://github.com/atinc/ngx-tethys/issues/INFR-1638)
* **schematics:** add schematics for migrate to v13 ([#1664](https://github.com/atinc/ngx-tethys/issues/1664)) ([291f0ba](https://github.com/atinc/ngx-tethys/commit/291f0ba498359a3b1f4bd82acbe23c0530713a7e))
* **store:** remove store from tethys and add mini-store to core for time-picker and notify #INFR-2347 ([62aa1f9](https://github.com/atinc/ngx-tethys/commit/62aa1f992de74b0ae57622c12fab4c75700fbf3b)), closes [#INFR-2347](https://github.com/atinc/ngx-tethys/issues/INFR-2347)



# [13.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.2...13.0.0-next.3) (2022-05-13)


### Bug Fixes

* update incorrect import path for select.mixin ([a867c54](https://github.com/atinc/ngx-tethys/commit/a867c548d5d95bb06ddc26fad583bbd1c2da7625))



# [13.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.1...13.0.0-next.2) (2022-05-13)



# [13.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/12.1.26...13.0.0-next.1) (2022-05-13)


### Features

* **schematics:** replace ngx-tethys/store to @tethys/store at update-12  ([#1653](https://github.com/atinc/ngx-tethys/issues/1653)) ([aae1721](https://github.com/atinc/ngx-tethys/commit/aae17215820006c15d001016062886f5cdc465c7))



# [13.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/12.1.25...13.0.0-next.0) (2022-05-11)



## [12.1.33](https://github.com/atinc/ngx-tethys/compare/12.1.32...12.1.33) (2022-05-31)

### Bug Fixes

* **image:** fix image can not copy when preview ([#1763](https://github.com/atinc/ngx-tethys/issues/1763)) ([03c3b72](https://github.com/atinc/ngx-tethys/commit/03c3b72680f000d2e64f081b2f0f9cbf2a08e599))


# [13.1.0-next.5](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.4...13.1.0-next.5) (2022-05-31)


### Features

* **styles:** add spacers 8,9,10(32px,36px,40px), and improve negative margin docs ([39b947b](https://github.com/atinc/ngx-tethys/commit/39b947b7d288054d9600380d10033e34ad5262ed))



# [13.1.0-next.4](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.3...13.1.0-next.4) (2022-05-30)


### Features

* **action:** update x of action-padding to 0.5rem #INFR-3285 ([cafc1e8](https://github.com/atinc/ngx-tethys/commit/cafc1e8f9ffb492a022107a96d7f456ae1266536)), closes [#INFR-3285](https://github.com/atinc/ngx-tethys/issues/INFR-3285)
* **layout:** add thy-sidebar-content component with sidebar-content class and refactor header sizes [#1755](https://github.com/atinc/ngx-tethys/issues/1755) ([#1756](https://github.com/atinc/ngx-tethys/issues/1756)) ([a4479bc](https://github.com/atinc/ngx-tethys/commit/a4479bcc72a8ca6a979a83a95c9c9569674794e5))



# [13.1.0-next.3](https://github.com/atinc/ngx-tethys/compare/13.0.1...13.1.0-next.3) (2022-05-30)


### Bug Fixes

* **menu:** change menu theme name and group params #INFR-3277 ([6b6578f](https://github.com/atinc/ngx-tethys/commit/6b6578fdaf38f4aa7e085e0a3ebb495678e36bd8)), closes [#INFR-3277](https://github.com/atinc/ngx-tethys/issues/INFR-3277)


### Features

* **styles:** update spacer to 0-7(4px、8px、12px、16px、20px、24px、28px) and update space component apply to it, refactor styles doc ([#1748](https://github.com/atinc/ngx-tethys/issues/1748)) ([3bb0bbd](https://github.com/atinc/ngx-tethys/commit/3bb0bbd2bcb00bd0978a11e1524eb2c30785e778))



# [13.1.0-next.2](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.1...13.1.0-next.2) (2022-05-27)


### Features

* **menu:** menu suport divide theme #INFR-3229 ([2f6930e](https://github.com/atinc/ngx-tethys/commit/2f6930edf7fdaa7fb46bf3fbe05f19d949e7395b)), closes [#INFR-3229](https://github.com/atinc/ngx-tethys/issues/INFR-3229)



# [13.1.0-next.1](https://github.com/atinc/ngx-tethys/compare/13.1.0-next.0...13.1.0-next.1) (2022-05-27)


### Features

* update nav and thy-header size and refactor styles ([#1741](https://github.com/atinc/ngx-tethys/issues/1741)) ([f86c73e](https://github.com/atinc/ngx-tethys/commit/f86c73ec7b93c155e295710bf5e571199b9c316a))



# [13.1.0-next.0](https://github.com/atinc/ngx-tethys/compare/13.0.0...13.1.0-next.0) (2022-05-27)


### Features

* **action:** add thy-action compoent #INFR-3240 [#1729](https://github.com/atinc/ngx-tethys/issues/1729) ([921abc6](https://github.com/atinc/ngx-tethys/commit/921abc6a5c01ce82408ff444a1ade169c84344af)), closes [#INFR-3240](https://github.com/atinc/ngx-tethys/issues/INFR-3240)
* **layout:** add thy-sidebar-header and thy-sidebar-footer, add thyTheme input to thy-sidebar, refactor styles (#INFR-3226) ([#1728](https://github.com/atinc/ngx-tethys/issues/1728)) ([0e6a5e9](https://github.com/atinc/ngx-tethys/commit/0e6a5e9db91b18972b484ed3008cb0b91ff984e8)), closes [#INFR-3226](https://github.com/atinc/ngx-tethys/issues/INFR-3226)



## [13.0.1](https://github.com/atinc/ngx-tethys/compare/13.0.0...13.0.1) (2022-05-30)


## [12.1.32](https://github.com/atinc/ngx-tethys/compare/12.1.31...12.1.32) (2022-05-27)

### Bug Fixes

* **image:** adjust header and operation opacity #WIK-6737 ([#1723](https://github.com/atinc/ngx-tethys/issues/1723)) ([c7d60fe](https://github.com/atinc/ngx-tethys/commit/c7d60fe2f15f4b729af2c297b0ca7b393bf39a02)), closes [#WIK-6737](https://github.com/atinc/ngx-tethys/issues/WIK-6737)
* **image:** revise the copy link tips #WIK-6715 ([05f4626](https://github.com/atinc/ngx-tethys/commit/05f4626da470b6d73490929bcf3e8306515a02f6)), closes [#WIK-6715](https://github.com/atinc/ngx-tethys/issues/WIK-6715)


### Features

* **copy:** add thyCopyTipOffset input #INFR-3254 ([#1735](https://github.com/atinc/ngx-tethys/issues/1735)) ([3f06509](https://github.com/atinc/ngx-tethys/commit/3f065096b9c7e19f459898101c5bcb8636c50d8a)), closes [#INFR-3254](https://github.com/atinc/ngx-tethys/issues/INFR-3254)



# [13.0.0](https://github.com/atinc/ngx-tethys/compare/12.1.31...13.0.0) (2022-05-23)



# [13.0.0-next.8](https://github.com/atinc/ngx-tethys/compare/12.1.30...13.0.0-next.8) (2022-05-20)


### Bug Fixes

* **schematics:** fix order migrations ([8aeeefc](https://github.com/atinc/ngx-tethys/commit/8aeeefc97a20b5e2ad5206b3eafcafa65a4fc01e))



# [13.0.0-next.6](https://github.com/atinc/ngx-tethys/compare/12.1.28...13.0.0-next.6) (2022-05-19)


### Bug Fixes

* **schematics:** fix path when import Action from ngx-tethys ([6c168cf](https://github.com/atinc/ngx-tethys/commit/6c168cf543c93bb128f7c419e07dd57b4c1921e0))
* **styles:** use -nav-link-padding-y by variables fix errors and add Sass desc in migration-v13 ([#1698](https://github.com/atinc/ngx-tethys/issues/1698)) ([8d33df9](https://github.com/atinc/ngx-tethys/commit/8d33df9a7bdd6a89f4711002ae1fbcfdbc01f981))


### Features

* **button:** remove deprecated @Input thySquare, the default type is already square [#1686](https://github.com/atinc/ngx-tethys/issues/1686) #INFR-3125 ([#1687](https://github.com/atinc/ngx-tethys/issues/1687)) ([390d8aa](https://github.com/atinc/ngx-tethys/commit/390d8aa890f61b327fd9e2e96742cde341c940c9)), closes [#INFR-3125](https://github.com/atinc/ngx-tethys/issues/INFR-3125) [#INFR-3125](https://github.com/atinc/ngx-tethys/issues/INFR-3125)



# [13.0.0-next.5](https://github.com/atinc/ngx-tethys/compare/12.1.27...13.0.0-next.5) (2022-05-17)


### Bug Fixes

* **schematics:** fix import error when has alias #INFR-2685 ([98c085f](https://github.com/atinc/ngx-tethys/commit/98c085f1b31c87e265758bc4de01b217ccd420c0)), closes [#INFR-2685](https://github.com/atinc/ngx-tethys/issues/INFR-2685)


### Features

* **styles:** export all mixin use forward #INFR-3124 [#1683](https://github.com/atinc/ngx-tethys/issues/1683) ([e126f00](https://github.com/atinc/ngx-tethys/commit/e126f00d4ba11b5dc065c9489560c1756baaebcd)), closes [#INFR-3124](https://github.com/atinc/ngx-tethys/issues/INFR-3124)



# [13.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.3...13.0.0-next.4) (2022-05-13)


### Features

* **markdown:** remove markdown component and some js assets #INFR-1638 ([243407e](https://github.com/atinc/ngx-tethys/commit/243407e819a07a5e8fb2bba06d74f1503470f6cc)), closes [#INFR-1638](https://github.com/atinc/ngx-tethys/issues/INFR-1638)
* **schematics:** add schematics for migrate to v13 ([#1664](https://github.com/atinc/ngx-tethys/issues/1664)) ([291f0ba](https://github.com/atinc/ngx-tethys/commit/291f0ba498359a3b1f4bd82acbe23c0530713a7e))
* **store:** remove store from tethys and add mini-store to core for time-picker and notify #INFR-2347 ([62aa1f9](https://github.com/atinc/ngx-tethys/commit/62aa1f992de74b0ae57622c12fab4c75700fbf3b)), closes [#INFR-2347](https://github.com/atinc/ngx-tethys/issues/INFR-2347)



# [13.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.2...13.0.0-next.3) (2022-05-13)


### Bug Fixes

* update incorrect import path for select.mixin ([a867c54](https://github.com/atinc/ngx-tethys/commit/a867c548d5d95bb06ddc26fad583bbd1c2da7625))



# [13.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/13.0.0-next.1...13.0.0-next.2) (2022-05-13)



# [13.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/12.1.26...13.0.0-next.1) (2022-05-13)


### Features

* **schematics:** replace ngx-tethys/store to @tethys/store at update-12  ([#1653](https://github.com/atinc/ngx-tethys/issues/1653)) ([aae1721](https://github.com/atinc/ngx-tethys/commit/aae17215820006c15d001016062886f5cdc465c7))



# [13.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/12.1.25...13.0.0-next.0) (2022-05-11)



## [12.1.31](https://github.com/atinc/ngx-tethys/compare/12.1.30...12.1.31) (2022-05-23)



## [12.1.30](https://github.com/atinc/ngx-tethys/compare/12.1.29...12.1.30) (2022-05-20)


### Bug Fixes

* **notify:** fix assign default config error ([#1703](https://github.com/atinc/ngx-tethys/issues/1703)) ([6ea753f](https://github.com/atinc/ngx-tethys/commit/6ea753f5a18b9585ef07653b657174cb7902c93f))


### Features

* **divider:** add thyDeeper param to control whether the color is deepened and set height to 16px for vertical #INFR-3206 ([6a1b38d](https://github.com/atinc/ngx-tethys/commit/6a1b38d1b3c0e0e0b23e8ce093a5912ace19e1c0)), closes [#INFR-3206](https://github.com/atinc/ngx-tethys/issues/INFR-3206)
* **image:** support keydownEvents and adjust preview interactive #INFR-3204 ([#1705](https://github.com/atinc/ngx-tethys/issues/1705)) ([a8fc56e](https://github.com/atinc/ngx-tethys/commit/a8fc56e42075cceeec44d545647956a0f2e28b96)), closes [#INFR-3204](https://github.com/atinc/ngx-tethys/issues/INFR-3204)



## [12.1.29](https://github.com/atinc/ngx-tethys/compare/12.1.28...12.1.29) (2022-05-19)


### Bug Fixes

* #INFR-3116 the selected status is lost after dragging  ([a2df98b](https://github.com/atinc/ngx-tethys/commit/a2df98b9b36a7f57679fca4ce552a38ad75e2203)), closes [#INFR-3116](https://github.com/atinc/ngx-tethys/issues/INFR-3116)
* **cascader:** fix empty data when use loadData property ([#1691](https://github.com/atinc/ngx-tethys/issues/1691)) ([31ed730](https://github.com/atinc/ngx-tethys/commit/31ed730d8b47dacf9b99f83b996805a5d951a3ac))
* **pagination:**  fix pagination style and add blur methods for quick jump #INFR-3074 ([#1662](https://github.com/atinc/ngx-tethys/issues/1662)) ([b8062a8](https://github.com/atinc/ngx-tethys/commit/b8062a8b352a79c121b0db188d46eaa6ba4b3b65)), closes [#INFR-3074](https://github.com/atinc/ngx-tethys/issues/INFR-3074)
* **pagination:** hide thy-pagination-total when total is 0 zd/#INFR-3147 ([#1697](https://github.com/atinc/ngx-tethys/issues/1697)) ([6c4f3b6](https://github.com/atinc/ngx-tethys/commit/6c4f3b66d1c1ca1c1b36af9c51162fcda2cebc04)), closes [zd/#INFR-3147](https://github.com/atinc/ngx-tethys/issues/INFR-3147)


### Features

* **image:** add preview image operations #INFR-3117 ([59627ca](https://github.com/atinc/ngx-tethys/commit/59627caec7c7806b3946dcd120104b92fdc2cf42)), closes [#INFR-3117](https://github.com/atinc/ngx-tethys/issues/INFR-3117)
* **image:** the IMAGE_MAX_ZOOM form 5 to 3 #WIK-6644 ([#1699](https://github.com/atinc/ngx-tethys/issues/1699)) ([862259c](https://github.com/atinc/ngx-tethys/commit/862259c706969b8e5875d6ea7138cc0a8b214a0d)), closes [#WIK-6644](https://github.com/atinc/ngx-tethys/issues/WIK-6644)
* **image:** update operations style with pointer-event #WIK-6643 ([#1700](https://github.com/atinc/ngx-tethys/issues/1700)) ([d473f65](https://github.com/atinc/ngx-tethys/commit/d473f6584f2869ac83a2347dc5ad31ec7986355f)), closes [#WIK-6643](https://github.com/atinc/ngx-tethys/issues/WIK-6643)



## [12.1.28](https://github.com/atinc/ngx-tethys/compare/12.1.27...12.1.28) (2022-05-18)


### Bug Fixes

* **image:** export service and class #INFR-3132 ([#1689](https://github.com/atinc/ngx-tethys/issues/1689)) ([a9cc4a7](https://github.com/atinc/ngx-tethys/commit/a9cc4a7c74ab6e21b4f6eabef671a29d4459ff3f)), closes [#INFR-3132](https://github.com/atinc/ngx-tethys/issues/INFR-3132) [#INFR-3132](https://github.com/atinc/ngx-tethys/issues/INFR-3132) [#INFR-3132](https://github.com/atinc/ngx-tethys/issues/INFR-3132)



## [12.1.27](https://github.com/atinc/ngx-tethys/compare/12.1.26...12.1.27) (2022-05-17)


### Bug Fixes

* **image:** add limit to image zoom #INFR-3106 ([b2a3a0b](https://github.com/atinc/ngx-tethys/commit/b2a3a0b9afaac4c249e1c34990bc15ee60452d3d)), closes [#INFR-3106](https://github.com/atinc/ngx-tethys/issues/INFR-3106)
* **image:** fix demo module import path #INFR-3098 ([d830133](https://github.com/atinc/ngx-tethys/commit/d830133785c75032f3ae3cd5c7bc7310306696bb)), closes [#INFR-3098](https://github.com/atinc/ngx-tethys/issues/INFR-3098)
* **table:**  fix drag style #INFR-1184 ([#1656](https://github.com/atinc/ngx-tethys/issues/1656)) ([c4df7e8](https://github.com/atinc/ngx-tethys/commit/c4df7e87ec964b1a810bbee58aeba31ee97bec6d)), closes [#INFR-1184](https://github.com/atinc/ngx-tethys/issues/INFR-1184)


### Features

* **image:** add basic image component #INFR-3098 ([#1658](https://github.com/atinc/ngx-tethys/issues/1658)) ([165264c](https://github.com/atinc/ngx-tethys/commit/165264c96104bafe8904439388d06c4be0356c7a)), closes [#INFR-3098](https://github.com/atinc/ngx-tethys/issues/INFR-3098)
* **image:** add image preview basic operation and refactor popover open #INFR-3106 ([#1678](https://github.com/atinc/ngx-tethys/issues/1678)) ([9a12940](https://github.com/atinc/ngx-tethys/commit/9a12940325a83466b67cc21c1725040b1d95ad73)), closes [#INFR-3106](https://github.com/atinc/ngx-tethys/issues/INFR-3106)



## [12.1.26](https://github.com/atinc/ngx-tethys/compare/12.1.25...12.1.26) (2022-05-12)


### Bug Fixes

* **fullscreen:** access and initialize the launch fullscreen button more explicitly ([faa91c9](https://github.com/atinc/ngx-tethys/commit/faa91c9cc977f401581a347321200f740ac0b490))
* **table:** fix drag style #INFR-1184 ([#1649](https://github.com/atinc/ngx-tethys/issues/1649)) ([30d10cb](https://github.com/atinc/ngx-tethys/commit/30d10cba351867eb88a00e3acad9e93c0393ccd3)), closes [#INFR-1184](https://github.com/atinc/ngx-tethys/issues/INFR-1184)
* **tree:** #INFR-3072  incorrect dragline style when thySize is set to 'sm' ([#1652](https://github.com/atinc/ngx-tethys/issues/1652)) ([cf6cc43](https://github.com/atinc/ngx-tethys/commit/cf6cc43cb1c4c5bc3ea084a7da011fe36ce79f5b)), closes [#INFR-3072](https://github.com/atinc/ngx-tethys/issues/INFR-3072)
* **tree:** #INFR-3086 Drag problem caused by incorrect data in event in thyOnDragDrop and thyBeforeDragDrop ([#1651](https://github.com/atinc/ngx-tethys/issues/1651)) ([bbe133c](https://github.com/atinc/ngx-tethys/commit/bbe133c11149f000b4c5aa199552f9ec5c816a00)), closes [#INFR-3086](https://github.com/atinc/ngx-tethys/issues/INFR-3086)


### Performance Improvements

* tree-shake deprecations and remove unused `getInjector` ([5a7fa76](https://github.com/atinc/ngx-tethys/commit/5a7fa76da7ffb604160e10c50deade23e746f828))
* **select:** do not run change detection on document clicks when the custom select is closed ([7137488](https://github.com/atinc/ngx-tethys/commit/713748893a2bcf7732ea5f012195619182b3a40e))
* **tree-select:** do not run change detection on document clicks when the popup is closed ([55443e4](https://github.com/atinc/ngx-tethys/commit/55443e4cab85f13e8a06c7c21b907c4a0615f2e9))



## [12.1.25](https://github.com/atinc/ngx-tethys/compare/12.1.24...12.1.25) (2022-05-09)


### Features

* **table:** add cdkScrollable to scrollable element  #INFR-3078 ([#1636](https://github.com/atinc/ngx-tethys/issues/1636)) ([263e3da](https://github.com/atinc/ngx-tethys/commit/263e3da9a8d0010cf2740dde7abe44a0195dc5a7)), closes [#INFR-3078](https://github.com/atinc/ngx-tethys/issues/INFR-3078)


### Performance Improvements

* tree-shake warnings and errors in production ([2f4bcd6](https://github.com/atinc/ngx-tethys/commit/2f4bcd61589262e0bb4673a204ae51b708b91769))



<a name="12.1.24"></a>
## [12.1.24](https://github.com/atinc/ngx-tethys/compare/12.1.23...12.1.24) (2022-05-09)


### Bug Fixes

* **cascader:** fix empty children still show data #INFR-3059 ([#1628](https://github.com/atinc/ngx-tethys/issues/1628)) ([4f2b190](https://github.com/atinc/ngx-tethys/commit/4f2b190)), closes [#INFR-3059](https://github.com/atinc/ngx-tethys/issues/INFR-3059)
* **list:** selection-list write value add makeForCheck #INFR-3065 ([#1629](https://github.com/atinc/ngx-tethys/issues/1629)) ([9a4d823](https://github.com/atinc/ngx-tethys/commit/9a4d823)), closes [#INFR-3065](https://github.com/atinc/ngx-tethys/issues/INFR-3065)
* **popover:** strictly restricted type ([#1632](https://github.com/atinc/ngx-tethys/issues/1632)) ([1068c0d](https://github.com/atinc/ngx-tethys/commit/1068c0d))
* **popover:** trigger change detection when show/hide, and add `thyDisabled` #INFR-3053 ([e4e1bea](https://github.com/atinc/ngx-tethys/commit/e4e1bea)), closes [#INFR-3053](https://github.com/atinc/ngx-tethys/issues/INFR-3053)


### Features

* **input:** input-search after clear focus again ([#1630](https://github.com/atinc/ngx-tethys/issues/1630)) ([f24df53](https://github.com/atinc/ngx-tethys/commit/f24df53))



## [12.1.23](https://github.com/atinc/ngx-tethys/compare/12.1.22...12.1.23) (2022-05-05)


### Bug Fixes

* **table:**  fix tree indent and group padding #INFR-3003 ([0c18d9c](https://github.com/atinc/ngx-tethys/commit/0c18d9ca2de31443b1da05fbd5b474e0578e4755)), closes [#INFR-3003](https://github.com/atinc/ngx-tethys/issues/INFR-3003)


### Features

* **table:** optimization fixed columns to table(#INFR-2933) ([#1623](https://github.com/atinc/ngx-tethys/issues/1623)) ([45bf687](https://github.com/atinc/ngx-tethys/commit/45bf6871d5032c4d3cb525e875b7675ce6cde7c5)), closes [#INFR-2933](https://github.com/atinc/ngx-tethys/issues/INFR-2933) [#INFR-2933](https://github.com/atinc/ngx-tethys/issues/INFR-2933) [#INFR-2933](https://github.com/atinc/ngx-tethys/issues/INFR-2933) [#INFR-3043](https://github.com/atinc/ngx-tethys/issues/INFR-3043) [#INFR-3043](https://github.com/atinc/ngx-tethys/issues/INFR-3043) [#INFR-3043](https://github.com/atinc/ngx-tethys/issues/INFR-3043) [#INFR-3043](https://github.com/atinc/ngx-tethys/issues/INFR-3043)
* replace '确认' by '确定' (lifei/#INFR-3047) ([#1624](https://github.com/atinc/ngx-tethys/issues/1624)) ([09a0b14](https://github.com/atinc/ngx-tethys/commit/09a0b14f8fb370f55e261e0d31b0dfc6ab982b20)), closes [lifei/#INFR-3047](https://github.com/atinc/ngx-tethys/issues/INFR-3047)
* **popover:** support autoAdaptive that watch content size and update popover position #INFR-2794 ([#1615](https://github.com/atinc/ngx-tethys/issues/1615)) ([7c2f03c](https://github.com/atinc/ngx-tethys/commit/7c2f03c058cd1ce36f2620d411d1d43a97d5923f)), closes [#INFR-2794](https://github.com/atinc/ngx-tethys/issues/INFR-2794)



## [12.1.22](https://github.com/atinc/ngx-tethys/compare/12.1.21...12.1.22) (2022-04-28)


### Bug Fixes

* **label:** fix the height of label with icon #INFR-3007 ([#1617](https://github.com/atinc/ngx-tethys/issues/1617)) ([d289542](https://github.com/atinc/ngx-tethys/commit/d2895427b0ad5321e91e14b041d0d84dbec834d7)), closes [#INFR-3007](https://github.com/atinc/ngx-tethys/issues/INFR-3007)
* **tree:** #INFR-3001 开启虚拟滚动后，原先 tree-node 样式失效，样式调整 ([#1619](https://github.com/atinc/ngx-tethys/issues/1619)) ([bf7e81e](https://github.com/atinc/ngx-tethys/commit/bf7e81e92ab60f2f8663ae9a65ca849f71ecbdf4)), closes [#INFR-3001](https://github.com/atinc/ngx-tethys/issues/INFR-3001)
* **tree-select:** delete tree select option icon line-height and use flex ([6ab3e30](https://github.com/atinc/ngx-tethys/commit/6ab3e304b3407dff1b1c33fd08b431ba7e8229e2))
* **tree-select:** fix icon and text align style error #INFR-3004 ([846a4ef](https://github.com/atinc/ngx-tethys/commit/846a4efb404db3cbc6655deac952b8dc49abf3f3)), closes [#INFR-3004](https://github.com/atinc/ngx-tethys/issues/INFR-3004)


### Features

* **autocomplete:** supports use with input-search #INFR-2992 ([#1612](https://github.com/atinc/ngx-tethys/issues/1612)) ([ad46721](https://github.com/atinc/ngx-tethys/commit/ad46721061029d3b97794f11d61776f1bc1b571b)), closes [#INFR-2992](https://github.com/atinc/ngx-tethys/issues/INFR-2992)
* **table:** add fixed column to table(#INFR-2933) ([#1609](https://github.com/atinc/ngx-tethys/issues/1609)) ([b88d2cf](https://github.com/atinc/ngx-tethys/commit/b88d2cffaf4f35c85ccc2a4bdd5aa9032d6377c5)), closes [#INFR-2933](https://github.com/atinc/ngx-tethys/issues/INFR-2933)



<a name="12.1.21"></a>
## [12.1.21](https://github.com/atinc/ngx-tethys/compare/12.1.20...12.1.21) (2022-04-27)


### Bug Fixes

* **tree:** fix scroll styles and update "visual" to "virtual" #INFR-2982  ([3327914](https://github.com/atinc/ngx-tethys/commit/3327914)), closes [#INFR-2982](https://github.com/atinc/ngx-tethys/issues/INFR-2982)


### Features

* **cascader:** add empty state #INFR-2986 ([#1610](https://github.com/atinc/ngx-tethys/issues/1610)) ([347de1f](https://github.com/atinc/ngx-tethys/commit/347de1f)), closes [#INFR-2986](https://github.com/atinc/ngx-tethys/issues/INFR-2986)



## [12.1.20](https://github.com/atinc/ngx-tethys/compare/12.1.18...12.1.20) (2022-04-24)


### Bug Fixes

* **pagination:** should to range less than total #INFR-2978 ([#1600](https://github.com/atinc/ngx-tethys/issues/1600)) ([2a297ea](https://github.com/atinc/ngx-tethys/commit/2a297eac701bc38cc42a70a295083c7f4229c742)), closes [#INFR-2978](https://github.com/atinc/ngx-tethys/issues/INFR-2978)
* **tree:**  sync tree nodes when add and drag tree node #INFR-2562  ([a29d1a5](https://github.com/atinc/ngx-tethys/commit/a29d1a506b7f9a07e48638e81aaeddc8e3312e9e)), closes [#INFR-2562](https://github.com/atinc/ngx-tethys/issues/INFR-2562)


### Features

* **input:** change clear to thyClear #INFR-2797 ([6763d6c](https://github.com/atinc/ngx-tethys/commit/6763d6c4796063576c5ecc577772afa224532a17)), closes [#INFR-2797](https://github.com/atinc/ngx-tethys/issues/INFR-2797)
* **mention:** mention support suggestionsTemplateRef ([#1598](https://github.com/atinc/ngx-tethys/issues/1598)) ([eca761f](https://github.com/atinc/ngx-tethys/commit/eca761fe8537d961fc5704dfeebc910f70873ca2))
* **popover:** add minWidth at popover default config default value is 240px #INFR-2976 ([0afa89a](https://github.com/atinc/ngx-tethys/commit/0afa89a5266651f6f145901cdc51561ac9430f54)), closes [#INFR-2976](https://github.com/atinc/ngx-tethys/issues/INFR-2976)
* **tree:** add visual scrolling #INFR-2562  ([6f5b623](https://github.com/atinc/ngx-tethys/commit/6f5b623e47a33a2437dc784e799e279c79afaac9)), closes [#INFR-2562](https://github.com/atinc/ngx-tethys/issues/INFR-2562)



<a name="12.1.19"></a>
## [12.1.19](https://github.com/atinc/ngx-tethys/compare/12.1.18...12.1.19) (2022-04-19)


### Features

* **input:** change clear to thyClear #INFR-2797 ([6763d6c](https://github.com/atinc/ngx-tethys/commit/6763d6c)), closes [#INFR-2797](https://github.com/atinc/ngx-tethys/issues/INFR-2797)
* **tree:** add visual scrolling #INFR-2562  ([6f5b623](https://github.com/atinc/ngx-tethys/commit/6f5b623)), closes [#INFR-2562](https://github.com/atinc/ngx-tethys/issues/INFR-2562)



## [12.1.18](https://github.com/atinc/ngx-tethys/compare/12.1.17...12.1.18) (2022-04-15)


### Bug Fixes

* **tree:** fix tree node icon and tree-select prefix icon color to gray-500 #INFR-2872 #INFR-2874 ([#1589](https://github.com/atinc/ngx-tethys/issues/1589)) ([266bfa1](https://github.com/atinc/ngx-tethys/commit/266bfa1e07773ea4241e200a380a465d8e8ae4b2)), closes [#INFR-2872](https://github.com/atinc/ngx-tethys/issues/INFR-2872) [#INFR-2874](https://github.com/atinc/ngx-tethys/issues/INFR-2874)


### Features

* **dropdown:** add insideClosable of thyPopoverOptions and set the default value to true #INFR-2890 [#1587](https://github.com/atinc/ngx-tethys/issues/1587) ([bea6047](https://github.com/atinc/ngx-tethys/commit/bea6047b5f014515f594ef14c51a6f5d81f26a8d)), closes [#INFR-2890](https://github.com/atinc/ngx-tethys/issues/INFR-2890)



## [12.1.17](https://github.com/atinc/ngx-tethys/compare/12.1.16...12.1.17) (2022-04-14)


### Bug Fixes

* **mention:** resolve memory leaks ([a97a23e](https://github.com/atinc/ngx-tethys/commit/a97a23ecc677243353a4b7de97b1b7c29a41a074))
* **popover:** teardown subscriptions ([89448c9](https://github.com/atinc/ngx-tethys/commit/89448c9832d06c4227440c3cc4ff09a560fa66f2))


### Features

* **avatar:** add `loading` and `fetchpriority` to avatar image ([#1564](https://github.com/atinc/ngx-tethys/issues/1564)) ([b0d1dc2](https://github.com/atinc/ngx-tethys/commit/b0d1dc2cf724c392bcf367159b6bdf6fae8387e0))
* **dropdown:** add default width at thyPopoverOptions  BREAKING CHANGE: delete min-width at popover-container INFR-2886 ([1fa524f](https://github.com/atinc/ngx-tethys/commit/1fa524f08020a5bf984e82426d877557ea349f04))
* **dropdown:** add thyPopoverOptions parameter temporarily supports: placement, width and height #INFR-2857 ([3ea0dee](https://github.com/atinc/ngx-tethys/commit/3ea0deeccdf6d4c39f8f8554d09490d994c41058)), closes [#INFR-2857](https://github.com/atinc/ngx-tethys/issues/INFR-2857)
* **empty:** add `loading` and `fetchpriority` to image ([7e9c0b8](https://github.com/atinc/ngx-tethys/commit/7e9c0b888d19db6c39fcf999ea7ec20b8d99a6f2))



<a name="12.1.16"></a>
## [12.1.16](https://github.com/atinc/ngx-tethys/compare/12.1.15...12.1.16) (2022-04-02)


### Features

* **button:** add warning and outlint-warning button types #INFR-2527 ([#1558](https://github.com/atinc/ngx-tethys/issues/1558)) ([8689eca](https://github.com/atinc/ngx-tethys/commit/8689eca)), closes [#INFR-2527](https://github.com/atinc/ngx-tethys/issues/INFR-2527)
* **date-picker:** add flexibel model for range picker and range directive #INFR-2703 ([#1553](https://github.com/atinc/ngx-tethys/issues/1553)) ([d87f3b3](https://github.com/atinc/ngx-tethys/commit/d87f3b3)), closes [#INFR-2703](https://github.com/atinc/ngx-tethys/issues/INFR-2703) [#INFR-2703](https://github.com/atinc/ngx-tethys/issues/INFR-2703)
* **icon:** icon-registry add icon support untrusted url #INFR-2830 ([a680ae5](https://github.com/atinc/ngx-tethys/commit/a680ae5)), closes [#INFR-2830](https://github.com/atinc/ngx-tethys/issues/INFR-2830)



<a name="12.1.15"></a>
## [12.1.15](https://github.com/atinc/ngx-tethys/compare/12.1.14...12.1.15) (2022-03-31)


### Features

* **input:** add thyIconPosition to thy-input-search and refactor styles #INFR-2790 ([#1554](https://github.com/atinc/ngx-tethys/issues/1554)) ([bdb1c3d](https://github.com/atinc/ngx-tethys/commit/bdb1c3d)), closes [#INFR-2790](https://github.com/atinc/ngx-tethys/issues/INFR-2790)



<a name="12.1.14"></a>
## [12.1.14](https://github.com/atinc/ngx-tethys/compare/12.1.13...12.1.14) (2022-03-28)


### Bug Fixes

* **layout:** layout sidebar folder add collapse tip value #WIK-6133 ([#1551](https://github.com/atinc/ngx-tethys/issues/1551)) ([1e2fbb6](https://github.com/atinc/ngx-tethys/commit/1e2fbb6)), closes [#WIK-6133](https://github.com/atinc/ngx-tethys/issues/WIK-6133)



<a name="12.1.13"></a>
## [12.1.13](https://github.com/atinc/ngx-tethys/compare/12.1.12...12.1.13) (2022-03-28)


### Bug Fixes

* **flexible-text:** support multiline text (#INFR-2798) ([ba7e867](https://github.com/atinc/ngx-tethys/commit/ba7e867)), closes [#INFR-2798](https://github.com/atinc/ngx-tethys/issues/INFR-2798)


### Performance Improvements

* **table:** do not run change detection `pointerdown`, `touchstart` and `mousedown` events ([#1529](https://github.com/atinc/ngx-tethys/issues/1529)) ([e55a63d](https://github.com/atinc/ngx-tethys/commit/e55a63d))
* **tree:** do not run change detection when the tree node is hovered and the drag icon visibility is changed ([ed8ea5c](https://github.com/atinc/ngx-tethys/commit/ed8ea5c))



<a name="12.1.12"></a>
## [12.1.12](https://github.com/atinc/ngx-tethys/compare/12.1.11...12.1.12) (2022-03-25)


### Bug Fixes

* **cascader:** #INFR-2781 should  scroll to active item when menu open ([#1540](https://github.com/atinc/ngx-tethys/issues/1540)) ([cbfd95f](https://github.com/atinc/ngx-tethys/commit/cbfd95f)), closes [#INFR-2781](https://github.com/atinc/ngx-tethys/issues/INFR-2781)
* **fullscreen:** complete the `afterExited` since it has subscribers and do not run change detection on `keydown` events ([25a5ec5](https://github.com/atinc/ngx-tethys/commit/25a5ec5))
* **layout:** adjust layout folder icon color,size and shadow #INFR-2793 ([#1543](https://github.com/atinc/ngx-tethys/issues/1543)) ([38468ca](https://github.com/atinc/ngx-tethys/commit/38468ca)), closes [#INFR-2793](https://github.com/atinc/ngx-tethys/issues/INFR-2793)
* **resizable:** solve the style compatibility problem when dragging #INFR-2786 ([#1539](https://github.com/atinc/ngx-tethys/issues/1539)) ([e8213cc](https://github.com/atinc/ngx-tethys/commit/e8213cc)), closes [#INFR-2786](https://github.com/atinc/ngx-tethys/issues/INFR-2786)
* **time-picker:** teardown the subscription once the time picker is destroyed ([99cfe6d](https://github.com/atinc/ngx-tethys/commit/99cfe6d))
* **uploader:** cleanup xhr event listeners once the `upload` is unsubscribed ([590c3b9](https://github.com/atinc/ngx-tethys/commit/590c3b9))


### Performance Improvements

* **table:** do not run change detection when adding drag preview class ([a542899](https://github.com/atinc/ngx-tethys/commit/a542899))



<a name="12.1.11"></a>
## [12.1.11](https://github.com/atinc/ngx-tethys/compare/12.1.10...12.1.11) (2022-03-24)


### Bug Fixes

* **form:** teardown subscription within the `ThyFormValidatorService` ([80d8c45](https://github.com/atinc/ngx-tethys/commit/80d8c45))
* **menu:** remove the `click` listener once the `ThyMenuItemActionComponent` is destroyed ([bfbd661](https://github.com/atinc/ngx-tethys/commit/bfbd661))
* **notify:** teardown the subscription once the notify container is destroyed ([d4760fc](https://github.com/atinc/ngx-tethys/commit/d4760fc))
* **resizable:** re-enter the Angular zone when the `thyResizeStart` emits ([85e346f](https://github.com/atinc/ngx-tethys/commit/85e346f))
* **shared:** remove the `contextmenu` listener once the `thyContextMenu` is destroyed ([7536de3](https://github.com/atinc/ngx-tethys/commit/7536de3))
* **shared:** remove the `keydown` listener once the `ThyCtrlEnterDirective` is destroyed ([93b493f](https://github.com/atinc/ngx-tethys/commit/93b493f))
* **shared:** remove the `keydown` listener once the `thyEnter` is destroyed ([522ddf3](https://github.com/atinc/ngx-tethys/commit/522ddf3))
* **styles:** update default color of $success $info $warning and $danger #INFR-2752 ([#1504](https://github.com/atinc/ngx-tethys/issues/1504)) ([7bb2fc7](https://github.com/atinc/ngx-tethys/commit/7bb2fc7)), closes [#INFR-2752](https://github.com/atinc/ngx-tethys/issues/INFR-2752)


### Features

* **cascader:** #INFR-2557 activatedOptions is equal to selectedOptions during initialization ([#1506](https://github.com/atinc/ngx-tethys/issues/1506)) ([2728f49](https://github.com/atinc/ngx-tethys/commit/2728f49)), closes [#INFR-2557](https://github.com/atinc/ngx-tethys/issues/INFR-2557)
* **layout:** add folder of layoutSidebar #INFR-2748 ([#1533](https://github.com/atinc/ngx-tethys/issues/1533)) ([7f1ffbf](https://github.com/atinc/ngx-tethys/commit/7f1ffbf)), closes [#INFR-2748](https://github.com/atinc/ngx-tethys/issues/INFR-2748)
* **shared:** do not run change detection on the `thyStopPropagation` element and support binding changes ([ac4f8b9](https://github.com/atinc/ngx-tethys/commit/ac4f8b9))


### Performance Improvements

* **action-menu:** do not run change detection when the menu item is clicked ([6a454ec](https://github.com/atinc/ngx-tethys/commit/6a454ec))
* **anchor:** mark `scroll` listener as passive ([15d7336](https://github.com/atinc/ngx-tethys/commit/15d7336))
* **back-top:** do not run change detection if there are no `visibleChange` observers ([#1511](https://github.com/atinc/ngx-tethys/issues/1511)) ([5b1da11](https://github.com/atinc/ngx-tethys/commit/5b1da11))
* **core:** do not run change detection when scrolling ([fcc1c52](https://github.com/atinc/ngx-tethys/commit/fcc1c52))
* **dialog:** do not run change detection when the dialog is focused asynchronously ([05dbd30](https://github.com/atinc/ngx-tethys/commit/05dbd30))
* **property-operation:** do not run change detection unnecessary when the `thy-property-operation` is clicked ([a9da5c2](https://github.com/atinc/ngx-tethys/commit/a9da5c2))
* **resizable:** do not run change detection on mousedown、mouseenter、mouseleave and touchstart events #INFR-2501 ([b1e46c8](https://github.com/atinc/ngx-tethys/commit/b1e46c8)), closes [#INFR-2501](https://github.com/atinc/ngx-tethys/issues/INFR-2501)
* **resizable:** mark `mousedown` and `touchstart` listeners as passive ([#1530](https://github.com/atinc/ngx-tethys/issues/1530)) ([fa91bde](https://github.com/atinc/ngx-tethys/commit/fa91bde))
* **shared:** do not run change detection when the `thyAutofocus` focuses the element ([ee4845c](https://github.com/atinc/ngx-tethys/commit/ee4845c))
* **shared:** run change detection only when the `thyShow` has been clicked outside ([99352f9](https://github.com/atinc/ngx-tethys/commit/99352f9))
* **uploader:** do not run change detection when the file select is clicked ([bdb9447](https://github.com/atinc/ngx-tethys/commit/bdb9447))



<a name="12.1.10"></a>
## [12.1.10](https://github.com/atinc/ngx-tethys/compare/12.1.9...12.1.10) (2022-03-09)


### Bug Fixes

* **select:** #INFR-2621 fix select-control-multiple font-size ([5d13c82](https://github.com/atinc/ngx-tethys/commit/5d13c82))
* **select:** #INFR-2621 fix select-control-multiple font-size ([fba8d5d](https://github.com/atinc/ngx-tethys/commit/fba8d5d))
* **select:** #INFR-2621 fix select-control-multiple font-size ([eeaf4da](https://github.com/atinc/ngx-tethys/commit/eeaf4da))


### Features

* **dropdown:** refactor thyDropdown directive, add thy-dropdown-menu and related components #INFR-2139 ([#1494](https://github.com/atinc/ngx-tethys/issues/1494)) ([ae51ea4](https://github.com/atinc/ngx-tethys/commit/ae51ea4)), closes [#INFR-2139](https://github.com/atinc/ngx-tethys/issues/INFR-2139) [#INFR-2139](https://github.com/atinc/ngx-tethys/issues/INFR-2139)
* **popover:** add getPovoverRef function #INFR-2680 ([2425564](https://github.com/atinc/ngx-tethys/commit/2425564)), closes [#INFR-2680](https://github.com/atinc/ngx-tethys/issues/INFR-2680)
* **popover:** add getPovoverRef function #INFR-2680 ([45976a3](https://github.com/atinc/ngx-tethys/commit/45976a3)), closes [#INFR-2680](https://github.com/atinc/ngx-tethys/issues/INFR-2680)
* **popover:** add getPovoverRef function #INFR-2680 ([1e2a31e](https://github.com/atinc/ngx-tethys/commit/1e2a31e)), closes [#INFR-2680](https://github.com/atinc/ngx-tethys/issues/INFR-2680)



<a name="12.1.9"></a>
## [12.1.9](https://github.com/atinc/ngx-tethys/compare/12.1.8...12.1.9) (2022-03-04)


### Features

* **date-range:** support thyDisabledDate and thyOnCalendarChange #INFR-2665 ([13764d6](https://github.com/atinc/ngx-tethys/commit/13764d6)), closes [#INFR-2665](https://github.com/atinc/ngx-tethys/issues/INFR-2665)



<a name="12.1.8"></a>
## [12.1.8](https://github.com/atinc/ngx-tethys/compare/12.1.7...12.1.8) (2022-02-28)


### Bug Fixes

* **button:** reset padding-x for only icon button in group #INFR-2657 ([d96ddf9](https://github.com/atinc/ngx-tethys/commit/d96ddf9)), closes [#INFR-2657](https://github.com/atinc/ngx-tethys/issues/INFR-2657)
* **cascader:** #INFR-2639 fixed cascader disable style ([#1482](https://github.com/atinc/ngx-tethys/issues/1482)) ([f3f778c](https://github.com/atinc/ngx-tethys/commit/f3f778c))
* **form:** fix form enter key for keyboard event bug #INFR-979 ([#1465](https://github.com/atinc/ngx-tethys/issues/1465)) ([cc84a8a](https://github.com/atinc/ngx-tethys/commit/cc84a8a)), closes [#INFR-979](https://github.com/atinc/ngx-tethys/issues/INFR-979)
* **form:** should not throw error when there is no thySubmit directive in the thyForm ([1345de7](https://github.com/atinc/ngx-tethys/commit/1345de7)), closes [#INFR-979](https://github.com/atinc/ngx-tethys/issues/INFR-979) [#INFR-979](https://github.com/atinc/ngx-tethys/issues/INFR-979)
* **fullscreen:** change targetLaunchededClass to targetLaunchedClass #INFR-2324 ([ca4ce38](https://github.com/atinc/ngx-tethys/commit/ca4ce38)), closes [#INFR-2324](https://github.com/atinc/ngx-tethys/issues/INFR-2324)
* **layout:** update dragRef's pointer-events to "all" when thyIsDraggableWidth is true, and improve docs and test cases #INFR-2610 ([#1467](https://github.com/atinc/ngx-tethys/issues/1467)) ([3ca10bf](https://github.com/atinc/ngx-tethys/commit/3ca10bf)), closes [#INFR-2610](https://github.com/atinc/ngx-tethys/issues/INFR-2610)
* **pagination:** separate showTotal and total ([8afc984](https://github.com/atinc/ngx-tethys/commit/8afc984))
* **progress:** should reset max when value and max is change #INFR-2608 ([#1473](https://github.com/atinc/ngx-tethys/issues/1473)) ([8d73270](https://github.com/atinc/ngx-tethys/commit/8d73270)), closes [#INFR-2608](https://github.com/atinc/ngx-tethys/issues/INFR-2608)
* **select:** view can not update when value and options is empty #INFR-2653 ([7b30f3f](https://github.com/atinc/ngx-tethys/commit/7b30f3f)), closes [#INFR-2653](https://github.com/atinc/ngx-tethys/issues/INFR-2653)


### Features

* **dialog:** add canClose and force close for dialog INFR-2605 ([cd736e5](https://github.com/atinc/ngx-tethys/commit/cd736e5)), closes [#INFR-2605](https://github.com/atinc/ngx-tethys/issues/INFR-2605)
* **pagination:** add pages size select to pagination(#INFR-2340) ([2c3c1de](https://github.com/atinc/ngx-tethys/commit/2c3c1de)), closes [#INFR-2340](https://github.com/atinc/ngx-tethys/issues/INFR-2340)



<a name="12.1.7"></a>
## [12.1.7](https://github.com/atinc/ngx-tethys/compare/12.1.6...12.1.7) (2022-02-16)


### Bug Fixes

* **button:** reset all sizes of button and input, xs=24px sm=28px, md=32px, default=36px, lg=44px #INFR-2607 ([#1462](https://github.com/atinc/ngx-tethys/issues/1462)) ([2a9eb60](https://github.com/atinc/ngx-tethys/commit/2a9eb60)), closes [#INFR-2607](https://github.com/atinc/ngx-tethys/issues/INFR-2607)
* **dialog:** extract dialog-full style from media query #INFR-2569 ([6a75b0d](https://github.com/atinc/ngx-tethys/commit/6a75b0d)), closes [#INFR-2569](https://github.com/atinc/ngx-tethys/issues/INFR-2569)
* **guider:** fix live demo example #INFR-2548 ([#1449](https://github.com/atinc/ngx-tethys/issues/1449)) ([23d60df](https://github.com/atinc/ngx-tethys/commit/23d60df)), closes [#INFR-2548](https://github.com/atinc/ngx-tethys/issues/INFR-2548)
* **transfer:** fix rightDataSource after drag and improve transfer test coverage rate #INFR-2175 ([#1451](https://github.com/atinc/ngx-tethys/issues/1451)) ([a4a3216](https://github.com/atinc/ngx-tethys/commit/a4a3216)), closes [#INFR-2175](https://github.com/atinc/ngx-tethys/issues/INFR-2175) [#INFR-2175](https://github.com/atinc/ngx-tethys/issues/INFR-2175) [#INFR-2175](https://github.com/atinc/ngx-tethys/issues/INFR-2175)


### Features

* **avatar:** support avatar thySize 44 #INFR-2561 ([#1452](https://github.com/atinc/ngx-tethys/issues/1452)) ([33577ba](https://github.com/atinc/ngx-tethys/commit/33577ba)), closes [#INFR-2561](https://github.com/atinc/ngx-tethys/issues/INFR-2561)
* **layout:** add thyDivided prop to thy-header represent whether there is bottom border and deprecated thyHasBorder #INFR-2555 ([#1450](https://github.com/atinc/ngx-tethys/issues/1450)) ([8982d8e](https://github.com/atinc/ngx-tethys/commit/8982d8e)), closes [#INFR-2555](https://github.com/atinc/ngx-tethys/issues/INFR-2555) [#INFR-2555](https://github.com/atinc/ngx-tethys/issues/INFR-2555)
* **pagination:**  support custom pages #INFR-2600 ([#1463](https://github.com/atinc/ngx-tethys/issues/1463)) ([ed49797](https://github.com/atinc/ngx-tethys/commit/ed49797)), closes [#INFR-2600](https://github.com/atinc/ngx-tethys/issues/INFR-2600)



<a name="12.1.6"></a>
## [12.1.6](https://github.com/atinc/ngx-tethys/compare/12.1.5...12.1.6) (2022-01-20)


### Bug Fixes

* **date-picker:** date picker support shortcut options #INFR-2521 ([#1442](https://github.com/atinc/ngx-tethys/issues/1442)) ([7afd783](https://github.com/atinc/ngx-tethys/commit/7afd783)), closes [#INFR-2521](https://github.com/atinc/ngx-tethys/issues/INFR-2521)
* **date-picker:** fix prev and next button style #INFR-2321 ([#1444](https://github.com/atinc/ngx-tethys/issues/1444)) ([41d3783](https://github.com/atinc/ngx-tethys/commit/41d3783)), closes [#INFR-2321](https://github.com/atinc/ngx-tethys/issues/INFR-2321) [#INFR-2321](https://github.com/atinc/ngx-tethys/issues/INFR-2321)


### Features

* **slider:** add slider size setting(#INFR-2533) ([#1443](https://github.com/atinc/ngx-tethys/issues/1443)) ([ad0ec3c](https://github.com/atinc/ngx-tethys/commit/ad0ec3c)), closes [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533) [#INFR-2533](https://github.com/atinc/ngx-tethys/issues/INFR-2533)



<a name="12.1.5"></a>
## [12.1.5](https://github.com/atinc/ngx-tethys/compare/12.1.4...12.1.5) (2022-01-14)


### Bug Fixes

* **switch:** add check when writeValue #WIK-5638 ([294f5c7](https://github.com/atinc/ngx-tethys/commit/294f5c7)), closes [#WIK-5638](https://github.com/atinc/ngx-tethys/issues/WIK-5638)
* **tree:** fix sm size drag style #INFR-2530 ([#1439](https://github.com/atinc/ngx-tethys/issues/1439)) ([e786bab](https://github.com/atinc/ngx-tethys/commit/e786bab)), closes [#INFR-2530](https://github.com/atinc/ngx-tethys/issues/INFR-2530)


### Features

* **switch:** use onPush ChangeDetectionStrategy #WIK-5638 ([#1435](https://github.com/atinc/ngx-tethys/issues/1435)) ([4d36769](https://github.com/atinc/ngx-tethys/commit/4d36769)), closes [#WIK-5638](https://github.com/atinc/ngx-tethys/issues/WIK-5638)



<a name="12.1.4"></a>
## [12.1.4](https://github.com/atinc/ngx-tethys/compare/12.1.3...12.1.4) (2022-01-04)


### Bug Fixes

* **progress:** set background to inner element and refactor styles #INFR-2476 ([#1426](https://github.com/atinc/ngx-tethys/issues/1426)) ([2023485](https://github.com/atinc/ngx-tethys/commit/2023485)), closes [#INFR-2476](https://github.com/atinc/ngx-tethys/issues/INFR-2476)



<a name="12.1.3"></a>
## [12.1.3](https://github.com/atinc/ngx-tethys/compare/12.1.2...12.1.3) (2021-12-27)


### Bug Fixes

* **progress:** deal thyMax equal 0 zd/#INFR-2476 ([#1422](https://github.com/atinc/ngx-tethys/issues/1422)) ([2637d96](https://github.com/atinc/ngx-tethys/commit/2637d96)), closes [zd/#INFR-2476](https://github.com/atinc/ngx-tethys/issues/INFR-2476) [zd/#INFR-2476](https://github.com/atinc/ngx-tethys/issues/INFR-2476)
* **shared:** listen event name of ThyStopPropagationDirective must be a string (#IN… ([#1410](https://github.com/atinc/ngx-tethys/issues/1410)) ([8afb7e9](https://github.com/atinc/ngx-tethys/commit/8afb7e9))



<a name="12.1.2"></a>
## [12.1.2](https://github.com/atinc/ngx-tethys/compare/12.1.1...12.1.2) (2021-12-22)


### Bug Fixes

* **progress:** change background and add test and example #INFR-2451 ([#1413](https://github.com/atinc/ngx-tethys/issues/1413)) ([da1718b](https://github.com/atinc/ngx-tethys/commit/da1718b)), closes [#INFR-2451](https://github.com/atinc/ngx-tethys/issues/INFR-2451)


### Features

* **collapse:** add collapse and test ([#1400](https://github.com/atinc/ngx-tethys/issues/1400)) ([50b067d](https://github.com/atinc/ngx-tethys/commit/50b067d))
* **input-number:** add input-number component #INFR-240 ([#1289](https://github.com/atinc/ngx-tethys/issues/1289)) ([6884ff9](https://github.com/atinc/ngx-tethys/commit/6884ff9)), closes [#INFR-240](https://github.com/atinc/ngx-tethys/issues/INFR-240) [#INFR-240](https://github.com/atinc/ngx-tethys/issues/INFR-240)



<a name="12.1.1"></a>
## [12.1.1](https://github.com/atinc/ngx-tethys/compare/12.1.0...12.1.1) (2021-11-25)


### Bug Fixes

* **select-control:** fix style ([2b94564](https://github.com/atinc/ngx-tethys/commit/2b94564))
* **tooltip:** text show align center to left #INFR-2384 ([8b8a887](https://github.com/atinc/ngx-tethys/commit/8b8a887)), closes [#INFR-2384](https://github.com/atinc/ngx-tethys/issues/INFR-2384)



<a name="12.1.0"></a>
# [12.1.0](https://github.com/atinc/ngx-tethys/compare/12.0.3...12.1.0) (2021-11-22)


### Features

* **select:** custom select support maxTagCount #INFR-2391 ([#1404](https://github.com/atinc/ngx-tethys/issues/1404)) ([a0d6537](https://github.com/atinc/ngx-tethys/commit/a0d6537)), closes [#INFR-2391](https://github.com/atinc/ngx-tethys/issues/INFR-2391)



<a name="12.0.3"></a>
## [12.0.3](https://github.com/atinc/ngx-tethys/compare/12.0.2...12.0.3) (2021-11-08)


### Bug Fixes

* **form:** fix label tips hover style and add thyTipsMode description in docs #INFR-2372 ([#1398](https://github.com/atinc/ngx-tethys/issues/1398)) ([bd9fd6e](https://github.com/atinc/ngx-tethys/commit/bd9fd6e)), closes [#INFR-2372](https://github.com/atinc/ngx-tethys/issues/INFR-2372) [#INFR-2372](https://github.com/atinc/ngx-tethys/issues/INFR-2372) [#INFR-2372](https://github.com/atinc/ngx-tethys/issues/INFR-2372)
* **select:** search supports lowercase and  uppercase (#INFR-2265) ([0160b30](https://github.com/atinc/ngx-tethys/commit/0160b30)), closes [#INFR-2265](https://github.com/atinc/ngx-tethys/issues/INFR-2265)


### Features

* **button:** supports passing pre and append thy-icon in ng-content, add only icon mode #INFR-2327 ([f542592](https://github.com/atinc/ngx-tethys/commit/f542592)), closes [#INFR-2327](https://github.com/atinc/ngx-tethys/issues/INFR-2327)
* **form:** add tipsMode for form group, support label and default #INFR-2368 ([#1397](https://github.com/atinc/ngx-tethys/issues/1397)) ([99a5658](https://github.com/atinc/ngx-tethys/commit/99a5658)), closes [#INFR-2368](https://github.com/atinc/ngx-tethys/issues/INFR-2368)
* **rate:**  add rate component #INFR-82 ([#1306](https://github.com/atinc/ngx-tethys/issues/1306)) ([860ba0d](https://github.com/atinc/ngx-tethys/commit/860ba0d)), closes [#INFR-82](https://github.com/atinc/ngx-tethys/issues/INFR-82)



<a name="12.0.2"></a>
## [12.0.2](https://github.com/atinc/ngx-tethys/compare/12.0.1...12.0.2) (2021-10-19)


### Features

* **nav:** support nav more popover render component #INFR-2334 ([#1383](https://github.com/atinc/ngx-tethys/issues/1383)) ([cb9276d](https://github.com/atinc/ngx-tethys/commit/cb9276d)), closes [#INFR-2334](https://github.com/atinc/ngx-tethys/issues/INFR-2334) [#INFR-2334](https://github.com/atinc/ngx-tethys/issues/INFR-2334) [#INFR-2334](https://github.com/atinc/ngx-tethys/issues/INFR-2334)
* **transfer:** support thyRightMax #INFR-2336 ([#1385](https://github.com/atinc/ngx-tethys/issues/1385)) ([201f2d1](https://github.com/atinc/ngx-tethys/commit/201f2d1)), closes [#INFR-2336](https://github.com/atinc/ngx-tethys/issues/INFR-2336) [#INFR-2336](https://github.com/atinc/ngx-tethys/issues/INFR-2336) [#INFR-2336](https://github.com/atinc/ngx-tethys/issues/INFR-2336) [#INFR-2336](https://github.com/atinc/ngx-tethys/issues/INFR-2336)



<a name="12.0.1"></a>
## [12.0.1](https://github.com/atinc/ngx-tethys/compare/12.0.0...12.0.1) (2021-10-13)


### Bug Fixes

* **date-picker:** set correct cell selected when change month or year #INFR-2335 ([83f100e](https://github.com/atinc/ngx-tethys/commit/83f100e)), closes [#INFR-2335](https://github.com/atinc/ngx-tethys/issues/INFR-2335)
* **form:** should display correct  invalid message when set min as 0 and type -1 #INFR-1490 ([2f07360](https://github.com/atinc/ngx-tethys/commit/2f07360)), closes [#INFR-1490](https://github.com/atinc/ngx-tethys/issues/INFR-1490)
* **form:** should get correct element when name and dom attribute name are the same, as nodeType #INFR-1214 ([8453608](https://github.com/atinc/ngx-tethys/commit/8453608)), closes [#INFR-1214](https://github.com/atinc/ngx-tethys/issues/INFR-1214)
* **notify:** fix dom not removed normally under firefox #WIK-2283 ([0d1af37](https://github.com/atinc/ngx-tethys/commit/0d1af37)), closes [#WIK-2283](https://github.com/atinc/ngx-tethys/issues/WIK-2283)
* **util:** remove unused methods for util and improve test coverage #INFR-2313 ([#1373](https://github.com/atinc/ngx-tethys/issues/1373)) ([e947f88](https://github.com/atinc/ngx-tethys/commit/e947f88)), closes [#INFR-2313](https://github.com/atinc/ngx-tethys/issues/INFR-2313) [#INFR-2313](https://github.com/atinc/ngx-tethys/issues/INFR-2313)


### Features

* **date-picker:** date-picker support month/year range and refactor somethings #INFR-2290 ([360c1e2](https://github.com/atinc/ngx-tethys/commit/360c1e2)), closes [#INFR-2290](https://github.com/atinc/ngx-tethys/issues/INFR-2290) [#INFR-2290](https://github.com/atinc/ngx-tethys/issues/INFR-2290) [#INFR-2290](https://github.com/atinc/ngx-tethys/issues/INFR-2290) [#INFR-2290](https://github.com/atinc/ngx-tethys/issues/INFR-2290) [#INFR-2290](https://github.com/atinc/ngx-tethys/issues/INFR-2290)



<a name="12.0.0"></a>
# [12.0.0](https://github.com/atinc/ngx-tethys/compare/12.0.0-next.5...12.0.0) (2021-09-10)


### Bug Fixes

* **label:** better naming format ([8479bfe](https://github.com/atinc/ngx-tethys/commit/8479bfe))
* **label:** fix outline type height ([#1334](https://github.com/atinc/ngx-tethys/issues/1334)) ([6203a74](https://github.com/atinc/ngx-tethys/commit/6203a74))
* **label:** remove conflict lines for $label-size-paddings #INFR-2284 ([a9bbcfd](https://github.com/atinc/ngx-tethys/commit/a9bbcfd)), closes [#INFR-2284](https://github.com/atinc/ngx-tethys/issues/INFR-2284)


### Performance Improvements

* **flexible-text:** adjust applyOverflow timing of execution ([#1337](https://github.com/atinc/ngx-tethys/issues/1337)) ([414e21d](https://github.com/atinc/ngx-tethys/commit/414e21d))



<a name="12.0.0-next.5"></a>
# [12.0.0-next.5](https://github.com/atinc/ngx-tethys/compare/11.0.5...12.0.0-next.5) (2021-09-10)


### Bug Fixes

* **styles:** mixins forward ([#1343](https://github.com/atinc/ngx-tethys/issues/1343)) ([701db5f](https://github.com/atinc/ngx-tethys/commit/701db5f))
* **table:** remove deprecated property ([#1350](https://github.com/atinc/ngx-tethys/issues/1350)) ([fc71e26](https://github.com/atinc/ngx-tethys/commit/fc71e26))


### Features

* **alert:** remove *-week compatibility logic #INFR-1932 ([#1349](https://github.com/atinc/ngx-tethys/issues/1349)) ([2dcb3ed](https://github.com/atinc/ngx-tethys/commit/2dcb3ed)), closes [#INFR-1932](https://github.com/atinc/ngx-tethys/issues/INFR-1932)
* **store:** mark as deprecated and add alert desc #INFR-2281 ([#1347](https://github.com/atinc/ngx-tethys/issues/1347)) ([0bf090f](https://github.com/atinc/ngx-tethys/commit/0bf090f)), closes [#INFR-2281](https://github.com/atinc/ngx-tethys/issues/INFR-2281)
* **styles:** use new module system for scss ([#1327](https://github.com/atinc/ngx-tethys/issues/1327)) ([841d22a](https://github.com/atinc/ngx-tethys/commit/841d22a))


### BREAKING CHANGES

* **alert:** if subapp use portal style, must upgrade to lastest version, otherwise the style will incorrect



<a name="12.0.0-next.4"></a>
# [12.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/12.0.0-next.3...12.0.0-next.4) (2021-09-01)


### Bug Fixes

* **button:** setting btn-icon-sm size to 32px #INFR-2248 ([#1338](https://github.com/atinc/ngx-tethys/issues/1338)) ([4ac080a](https://github.com/atinc/ngx-tethys/commit/4ac080a)), closes [#INFR-2248](https://github.com/atinc/ngx-tethys/issues/INFR-2248)


### BREAKING CHANGES

* **button:** fix btn-icon-sm from 30px  to 32px



<a name="12.0.0-next.3"></a>
# [12.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/12.0.0-next.2...12.0.0-next.3) (2021-08-28)


### Features

* **copy:** support copy thyShowNotify #INFR-2223 ([#1333](https://github.com/atinc/ngx-tethys/issues/1333)) ([69a4f42](https://github.com/atinc/ngx-tethys/commit/69a4f42)), closes [#INFR-2223](https://github.com/atinc/ngx-tethys/issues/INFR-2223)
* **vote:** vote support disabled #INFR-2229  ([#1331](https://github.com/atinc/ngx-tethys/issues/1331)) ([07e0d63](https://github.com/atinc/ngx-tethys/commit/07e0d63)), closes [#INFR-2229](https://github.com/atinc/ngx-tethys/issues/INFR-2229) [#INFR-2229](https://github.com/atinc/ngx-tethys/issues/INFR-2229)



<a name="12.0.0-next.2"></a>
# [12.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/12.0.0-next.1...12.0.0-next.2) (2021-08-18)


### Bug Fixes

* **copy:** fix notifyService multiple calls error (#INFR-2186) ([#1322](https://github.com/atinc/ngx-tethys/issues/1322)) ([c851fb6](https://github.com/atinc/ngx-tethys/commit/c851fb6)), closes [#INFR-2186](https://github.com/atinc/ngx-tethys/issues/INFR-2186)
* darken primary 10% ([34a071e](https://github.com/atinc/ngx-tethys/commit/34a071e))
* **core:** update backdropClosable type to boolean and format store tests ([9fccaf2](https://github.com/atinc/ngx-tethys/commit/9fccaf2))


### Features

* **styles:** update primary default color to [#348](https://github.com/atinc/ngx-tethys/issues/348)fe4 #INFR-2170 ([b269fdd](https://github.com/atinc/ngx-tethys/commit/b269fdd)), closes [#348fe4](https://github.com/atinc/ngx-tethys/issues/348fe4) [#INFR-2170](https://github.com/atinc/ngx-tethys/issues/INFR-2170)



<a name="12.0.0-next.1"></a>
# [12.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/11.0.4...12.0.0-next.1) (2021-07-12)


### Bug Fixes

* import cycles would need to be created to compile this component #INFR-2077 ([f3eba0b](https://github.com/atinc/ngx-tethys/commit/f3eba0b)), closes [#INFR-2077](https://github.com/atinc/ngx-tethys/issues/INFR-2077)


### Features

* upgrade ng to 12 ([eb35223](https://github.com/atinc/ngx-tethys/commit/eb35223))



<a name="11.0.5"></a>
## [11.0.5](https://github.com/atinc/ngx-tethys/compare/11.0.4...11.0.5) (2021-09-09)


### Bug Fixes

* **copy:** fix notifyService multiple calls error (#INFR-2186) ([#1321](https://github.com/atinc/ngx-tethys/issues/1321)) ([2b80dcf](https://github.com/atinc/ngx-tethys/commit/2b80dcf)), closes [#INFR-2186](https://github.com/atinc/ngx-tethys/issues/INFR-2186)
* **copy:** update notify import to ngx-tethys/notify fix build error #INFR-2207 ([947e415](https://github.com/atinc/ngx-tethys/commit/947e415)), closes [#INFR-2207](https://github.com/atinc/ngx-tethys/issues/INFR-2207)
* **notify:** fix notifyService multiple calls error (#INFR-2186) ([16ba3b2](https://github.com/atinc/ngx-tethys/commit/16ba3b2)), closes [#INFR-2186](https://github.com/atinc/ngx-tethys/issues/INFR-2186)
* **select:** add condition for scroll load #INFR-2243 ([b3bd3fb](https://github.com/atinc/ngx-tethys/commit/b3bd3fb)), closes [#INFR-2243](https://github.com/atinc/ngx-tethys/issues/INFR-2243)
* **select:** highlight option base on other property #INFR-2243 ([21f93de](https://github.com/atinc/ngx-tethys/commit/21f93de)), closes [#INFR-2243](https://github.com/atinc/ngx-tethys/issues/INFR-2243)
* **select:** modify test for local search #INFR-2243 ([6c0a2b8](https://github.com/atinc/ngx-tethys/commit/6c0a2b8)), closes [#INFR-2243](https://github.com/atinc/ngx-tethys/issues/INFR-2243)
* **select:** rename property #INFR-2243 ([e8de8f9](https://github.com/atinc/ngx-tethys/commit/e8de8f9)), closes [#INFR-2243](https://github.com/atinc/ngx-tethys/issues/INFR-2243)
* **select:** use search state to scroll #INFR-2243 ([23191d9](https://github.com/atinc/ngx-tethys/commit/23191d9)), closes [#INFR-2243](https://github.com/atinc/ngx-tethys/issues/INFR-2243)


### Features

* **card:** #INFR-1899 remove thy-card height and flex style ([#1311](https://github.com/atinc/ngx-tethys/issues/1311)) ([1b6c98e](https://github.com/atinc/ngx-tethys/commit/1b6c98e)), closes [#INFR-1899](https://github.com/atinc/ngx-tethys/issues/INFR-1899) [#INFR-1899](https://github.com/atinc/ngx-tethys/issues/INFR-1899) [#INFR-1899](https://github.com/atinc/ngx-tethys/issues/INFR-1899)
* **copy:** support copy thyShowNotify #INFR-2223 ([#1332](https://github.com/atinc/ngx-tethys/issues/1332)) ([9d869b1](https://github.com/atinc/ngx-tethys/commit/9d869b1)), closes [#INFR-2223](https://github.com/atinc/ngx-tethys/issues/INFR-2223)
* **dialog:** add getOpendsDialogs method #INFR-1919 ([#1313](https://github.com/atinc/ngx-tethys/issues/1313)) ([1897507](https://github.com/atinc/ngx-tethys/commit/1897507)), closes [#INFR-1919](https://github.com/atinc/ngx-tethys/issues/INFR-1919) [#INFR-1919](https://github.com/atinc/ngx-tethys/issues/INFR-1919)
* **select:** group hover add background color and modify font color … ([#1314](https://github.com/atinc/ngx-tethys/issues/1314)) ([18ba417](https://github.com/atinc/ngx-tethys/commit/18ba417)), closes [#INFR-2152](https://github.com/atinc/ngx-tethys/issues/INFR-2152)
* **select:** remove hover style and focus in style when disabled #INFR-2178 #INFR-2173 ([#1316](https://github.com/atinc/ngx-tethys/issues/1316)) ([adbfa72](https://github.com/atinc/ngx-tethys/commit/adbfa72)), closes [#INFR-2178](https://github.com/atinc/ngx-tethys/issues/INFR-2178) [#INFR-2173](https://github.com/atinc/ngx-tethys/issues/INFR-2173) [#INFR-2178](https://github.com/atinc/ngx-tethys/issues/INFR-2178) [#INFR-2173](https://github.com/atinc/ngx-tethys/issues/INFR-2173) [#INFR-2178](https://github.com/atinc/ngx-tethys/issues/INFR-2178)
* **vote:** vote support disabled #INFR-2229 ([#1330](https://github.com/atinc/ngx-tethys/issues/1330)) ([fb95507](https://github.com/atinc/ngx-tethys/commit/fb95507)), closes [#INFR-2229](https://github.com/atinc/ngx-tethys/issues/INFR-2229) [#INFR-2229](https://github.com/atinc/ngx-tethys/issues/INFR-2229)



<a name="11.0.4"></a>
## [11.0.4](https://github.com/atinc/ngx-tethys/compare/11.0.3...11.0.4) (2021-07-12)


### Features

* **cdk:** update afterId type to Id from string #INFR-2082 ([8679d47](https://github.com/atinc/ngx-tethys/commit/8679d47)), closes [#INFR-2082](https://github.com/atinc/ngx-tethys/issues/INFR-2082)
* **nav:** nav support responsive ([#1273](https://github.com/atinc/ngx-tethys/issues/1273)) ([4af8f26](https://github.com/atinc/ngx-tethys/commit/4af8f26))
* **store:** support afterId for EntityStore add and addWithReferences #INFR-2083 ([8bfa5fb](https://github.com/atinc/ngx-tethys/commit/8bfa5fb)), closes [#INFR-2083](https://github.com/atinc/ngx-tethys/issues/INFR-2083)



<a name="11.0.3"></a>
## [11.0.3](https://github.com/atinc/ngx-tethys/compare/11.0.2...11.0.3) (2021-07-06)



<a name="11.0.2"></a>
## [11.0.2](https://github.com/atinc/ngx-tethys/compare/11.0.1...11.0.2) (2021-07-05)


### Bug Fixes

* remove service provide:"root" for dialog, popover and autocomplete to fix get injector error ([#1293](https://github.com/atinc/ngx-tethys/issues/1293)) ([7e4b33c](https://github.com/atinc/ngx-tethys/commit/7e4b33c))


### Features

* **cdk:** add cdk and move immutable, is, logger to cdk #INFR-2039 ([2a48139](https://github.com/atinc/ngx-tethys/commit/2a48139)), closes [#INFR-2039](https://github.com/atinc/ngx-tethys/issues/INFR-2039)
* **space:** add space module and components #INFR-1988 ([e02de2a](https://github.com/atinc/ngx-tethys/commit/e02de2a)), closes [#INFR-1988](https://github.com/atinc/ngx-tethys/issues/INFR-1988)



<a name="11.0.1"></a>
## [11.0.1](https://github.com/atinc/ngx-tethys/compare/11.0.0...11.0.1) (2021-06-07)


### Bug Fixes

* **empty:** remove HostBinding and use UpdateHostClassService #INFR-1969 ([4c33960](https://github.com/atinc/ngx-tethys/commit/4c33960)), closes [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969) [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969) [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969) [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969) [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969) [#INFR-1969](https://github.com/atinc/ngx-tethys/issues/INFR-1969)



<a name="11.0.0"></a>
# [11.0.0](https://github.com/atinc/ngx-tethys/compare/11.0.0-next.7...11.0.0) (2021-05-24)


### Bug Fixes

* **button:** change button default border-radius to 4px #INFR-1778 ([df1b27b](https://github.com/atinc/ngx-tethys/commit/df1b27b)), closes [#INFR-1778](https://github.com/atinc/ngx-tethys/issues/INFR-1778)
* **tree-select:** fix empty style for tree-select #INFR-1952 ([#1252](https://github.com/atinc/ngx-tethys/issues/1252)) ([feca6b9](https://github.com/atinc/ngx-tethys/commit/feca6b9)), closes [#INFR-1952](https://github.com/atinc/ngx-tethys/issues/INFR-1952) [#INFR-1952](https://github.com/atinc/ngx-tethys/issues/INFR-1952) [#INFR-1952](https://github.com/atinc/ngx-tethys/issues/INFR-1952) [#INFR-1952](https://github.com/atinc/ngx-tethys/issues/INFR-1952) [#INFR-1952](https://github.com/atinc/ngx-tethys/issues/INFR-1952)



<a name="11.0.0-next.7"></a>
# [11.0.0-next.7](https://github.com/atinc/ngx-tethys/compare/11.0.0-next.6...11.0.0-next.7) (2021-05-20)



<a name="11.0.0-next.6"></a>
# [11.0.0-next.6](https://github.com/atinc/ngx-tethys/compare/11.0.0-next.5...11.0.0-next.6) (2021-05-20)



<a name="11.0.0-next.5"></a>
# [11.0.0-next.5](https://github.com/atinc/ngx-tethys/compare/11.0.0-next.4...11.0.0-next.5) (2021-05-17)



<a name="11.0.0-next.4"></a>
# [11.0.0-next.4](https://github.com/atinc/ngx-tethys/compare/11.0.0-next.3...11.0.0-next.4) (2021-05-17)



<a name="11.0.0-next.3"></a>
# [11.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/10.0.6...11.0.0-next.3) (2021-05-17)


### Bug Fixes

* **alert:** refactor alert docs and replace week to weak ([#1240](https://github.com/atinc/ngx-tethys/issues/1240)) ([3569ed3](https://github.com/atinc/ngx-tethys/commit/3569ed3)), closes [#INFR-1831](https://github.com/atinc/ngx-tethys/issues/INFR-1831) [#INFR-1924](https://github.com/atinc/ngx-tethys/issues/INFR-1924) [#INFR-1831](https://github.com/atinc/ngx-tethys/issues/INFR-1831)
* **badge:** replace thyColor with thyBackgroundColor #INFR-1868 ([c1f0fac](https://github.com/atinc/ngx-tethys/commit/c1f0fac)), closes [#INFR-1868](https://github.com/atinc/ngx-tethys/issues/INFR-1868)
* **card:** remove thyAlign in thy-card-content #INFR-1869 ([ca685cb](https://github.com/atinc/ngx-tethys/commit/ca685cb)), closes [#INFR-1869](https://github.com/atinc/ngx-tethys/issues/INFR-1869)
* **dialog:** replace thyShowBorderTop with thyDivided #INFR-1870 ([fb027f9](https://github.com/atinc/ngx-tethys/commit/fb027f9)), closes [#INFR-1870](https://github.com/atinc/ngx-tethys/issues/INFR-1870)
* **list:** replace thyFirstItemDefaultActive with thyAutoActiveFirstItem #INFR-1871 ([3c6242f](https://github.com/atinc/ngx-tethys/commit/3c6242f)), closes [#INFR-1871](https://github.com/atinc/ngx-tethys/issues/INFR-1871)
* **notify:** remove ThyNotifyOption and removeItemById #INFR-1872 ([96c7d32](https://github.com/atinc/ngx-tethys/commit/96c7d32)), closes [#INFR-1872](https://github.com/atinc/ngx-tethys/issues/INFR-1872)
* **schematics:** ng update html migration rule ([#1241](https://github.com/atinc/ngx-tethys/issues/1241)) ([1a704ff](https://github.com/atinc/ngx-tethys/commit/1a704ff))
* **slide:** remove show and hide in ThySlideService; remove key and class in ThySlideConfig #INFR-1874 ([89770a0](https://github.com/atinc/ngx-tethys/commit/89770a0)), closes [#INFR-1874](https://github.com/atinc/ngx-tethys/issues/INFR-1874)


### Features

* **schematics:** add schematics when update to v11 ([d98b98f](https://github.com/atinc/ngx-tethys/commit/d98b98f)), closes [#INFR-1827](https://github.com/atinc/ngx-tethys/issues/INFR-1827) [#INFR-1875](https://github.com/atinc/ngx-tethys/issues/INFR-1875)


### BREAKING CHANGES

* **slide:** remove show and hide in ThySlideService; remove key and class in ThySlideConfig
* **dialog:** replace thyShowBorderTop with thyDivided
* **list:** replace thyFirstItemDefaultActive with thyAutoActiveFirstItem
* **notify:** replace ThyNotifyOption with ThyNotifyOptions and replace removeItemById with removeNotifyById
* **badge:** replace thyColor with thyBackgroundColor
* **card:** remove thyAlign in thy-card-content



<a name="10.0.6"></a>
## [10.0.6](https://github.com/atinc/ngx-tethys/compare/10.0.5...10.0.6) (2021-04-26)


### Bug Fixes

* **dialog:** support custom okText (#INFR-1880) ([#1227](https://github.com/atinc/ngx-tethys/issues/1227)) ([e58b237](https://github.com/atinc/ngx-tethys/commit/e58b237)), closes [#INFR-1880](https://github.com/atinc/ngx-tethys/issues/INFR-1880)
* **nav:** remove style whrn focus ([#1224](https://github.com/atinc/ngx-tethys/issues/1224)) ([da73b86](https://github.com/atinc/ngx-tethys/commit/da73b86))


### Features

* **core:** add defaultPanelClass params for buildBaseOverlayConfig and simplified components use it #INFR-1852 ([#1209](https://github.com/atinc/ngx-tethys/issues/1209)) ([b11ec83](https://github.com/atinc/ngx-tethys/commit/b11ec83)), closes [#INFR-1852](https://github.com/atinc/ngx-tethys/issues/INFR-1852) [#INFR-1852](https://github.com/atinc/ngx-tethys/issues/INFR-1852) [#INFR-1852](https://github.com/atinc/ngx-tethys/issues/INFR-1852)
* **date-picker:** add thyPlacement #INFR-1893 ([#1228](https://github.com/atinc/ngx-tethys/issues/1228)) ([532b69d](https://github.com/atinc/ngx-tethys/commit/532b69d)), closes [#INFR-1893](https://github.com/atinc/ngx-tethys/issues/INFR-1893)
* **property-operation:** add thyFlexibleText #INFR-1911 ([#1234](https://github.com/atinc/ngx-tethys/issues/1234)) ([0daf9b4](https://github.com/atinc/ngx-tethys/commit/0daf9b4)), closes [#INFR-1911](https://github.com/atinc/ngx-tethys/issues/INFR-1911)
* **select:** add thyPlacement #INFR-1884 ([#1229](https://github.com/atinc/ngx-tethys/issues/1229)) ([e38b4b0](https://github.com/atinc/ngx-tethys/commit/e38b4b0)), closes [#INFR-1884](https://github.com/atinc/ngx-tethys/issues/INFR-1884)
* **select:** select support search with space #INFR-1894 ([#1230](https://github.com/atinc/ngx-tethys/issues/1230)) ([9e18c38](https://github.com/atinc/ngx-tethys/commit/9e18c38)), closes [#INFR-1894](https://github.com/atinc/ngx-tethys/issues/INFR-1894)
* **tree-select:** tree-select support search with space #INFR-1895 ([#1232](https://github.com/atinc/ngx-tethys/issues/1232)) ([af562a0](https://github.com/atinc/ngx-tethys/commit/af562a0)), closes [#INFR-1895](https://github.com/atinc/ngx-tethys/issues/INFR-1895)



<a name="10.0.5"></a>
## [10.0.5](https://github.com/atinc/ngx-tethys/compare/10.0.4...10.0.5) (2021-03-23)


### Bug Fixes

* **guider:** fix multiple hint ([#1197](https://github.com/atinc/ngx-tethys/issues/1197)) ([af1843e](https://github.com/atinc/ngx-tethys/commit/af1843e)), closes [#INFR-1803](https://github.com/atinc/ngx-tethys/issues/INFR-1803)



<a name="10.0.4"></a>
## [10.0.4](https://github.com/atinc/ngx-tethys/compare/10.0.3...10.0.4) (2021-03-22)


### Bug Fixes

* **select:** correct higlinght option logic #INFR-1797 ([#1191](https://github.com/atinc/ngx-tethys/issues/1191)) ([dc40bc1](https://github.com/atinc/ngx-tethys/commit/dc40bc1)), closes [#INFR-1797](https://github.com/atinc/ngx-tethys/issues/INFR-1797) [#INFR-1797](https://github.com/atinc/ngx-tethys/issues/INFR-1797)
* **select:** correct select active option error for search ([#1192](https://github.com/atinc/ngx-tethys/issues/1192)) ([6b800c0](https://github.com/atinc/ngx-tethys/commit/6b800c0))



<a name="10.0.3"></a>
## [10.0.3](https://github.com/atinc/ngx-tethys/compare/10.0.2...10.0.3) (2021-03-18)


### Bug Fixes

* **select:** correct select active status when first open panel and search option #INFR-1736 ([ac8105b](https://github.com/atinc/ngx-tethys/commit/ac8105b)), closes [#INFR-1736](https://github.com/atinc/ngx-tethys/issues/INFR-1736)


### Features

* **shared:** thyStopPropagation directive dont stop propagation when [thyStopPropagation]="false" ([#1188](https://github.com/atinc/ngx-tethys/issues/1188)) ([7b06f47](https://github.com/atinc/ngx-tethys/commit/7b06f47)), closes [#INFR-1779](https://github.com/atinc/ngx-tethys/issues/INFR-1779)



<a name="10.0.2"></a>
## [10.0.2](https://github.com/atinc/ngx-tethys/compare/10.0.1...10.0.2) (2021-03-12)


### Bug Fixes

* **guider:** fix not display hint after route jump ([9103f6e](https://github.com/atinc/ngx-tethys/commit/9103f6e))
* **guider:** remove activeKey when close guider ([#1174](https://github.com/atinc/ngx-tethys/issues/1174)) ([2581a0a](https://github.com/atinc/ngx-tethys/commit/2581a0a))
* **resizable:** fix build problem #INFR-1729 ([1e2bb3f](https://github.com/atinc/ngx-tethys/commit/1e2bb3f)), closes [#INFR-1729](https://github.com/atinc/ngx-tethys/issues/INFR-1729)
* **select:** clear active item style before initKeyManager #INFR-1724 ([#1178](https://github.com/atinc/ngx-tethys/issues/1178)) ([1b9e3ca](https://github.com/atinc/ngx-tethys/commit/1b9e3ca)), closes [#INFR-1724](https://github.com/atinc/ngx-tethys/issues/INFR-1724)
* **select:** correct options changes ([#1183](https://github.com/atinc/ngx-tethys/issues/1183)) ([42c3fc7](https://github.com/atinc/ngx-tethys/commit/42c3fc7))
* **select:** fix select options change status error ([#1181](https://github.com/atinc/ngx-tethys/issues/1181)) ([01514b1](https://github.com/atinc/ngx-tethys/commit/01514b1))
* **select:** fix single choice clear(#INFR-1665) ([5fd1c71](https://github.com/atinc/ngx-tethys/commit/5fd1c71)), closes [#INFR-1665](https://github.com/atinc/ngx-tethys/issues/INFR-1665)


### Features

* **popover:** support set scrollStrategy globally ([#1165](https://github.com/atinc/ngx-tethys/issues/1165)) ([46947e5](https://github.com/atinc/ngx-tethys/commit/46947e5)), closes [#INFR-1391](https://github.com/atinc/ngx-tethys/issues/INFR-1391)
* **resizable:** add resizable component #INFR-1316 ([271311e](https://github.com/atinc/ngx-tethys/commit/271311e)), closes [#INFR-1316](https://github.com/atinc/ngx-tethys/issues/INFR-1316)
* **resizable:** add resizable examples #INFR-1316 ([aacdd85](https://github.com/atinc/ngx-tethys/commit/aacdd85)), closes [#INFR-1316](https://github.com/atinc/ngx-tethys/issues/INFR-1316)
* **resizable:** export resizable and rename param #INFR-1316 ([d2adf14](https://github.com/atinc/ngx-tethys/commit/d2adf14)), closes [#INFR-1316](https://github.com/atinc/ngx-tethys/issues/INFR-1316)
* **select:** support set scrollStrategy globally ([#1185](https://github.com/atinc/ngx-tethys/issues/1185)) ([8778981](https://github.com/atinc/ngx-tethys/commit/8778981))



<a name="10.0.1"></a>
## [10.0.1](https://github.com/atinc/ngx-tethys/compare/10.0.0...10.0.1) (2021-02-25)


### Bug Fixes

* **input:** fix custom input disabled, #INFR-1630 ([#1159](https://github.com/atinc/ngx-tethys/issues/1159)) ([76a7c8b](https://github.com/atinc/ngx-tethys/commit/76a7c8b)), closes [#INFR-1630](https://github.com/atinc/ngx-tethys/issues/INFR-1630) [#INFR-1630](https://github.com/atinc/ngx-tethys/issues/INFR-1630)


### Features

* **guider:** support custom point class #INFR-1658 ([f6dac02](https://github.com/atinc/ngx-tethys/commit/f6dac02)), closes [#INFR-1658](https://github.com/atinc/ngx-tethys/issues/INFR-1658)



<a name="10.0.0"></a>
# [10.0.0](https://github.com/atinc/ngx-tethys/compare/9.0.24...10.0.0) (2021-02-19)


### Bug Fixes

* **util:** should return true when isString('') and add testcases #INFR-1629 ([#1146](https://github.com/atinc/ngx-tethys/issues/1146)) ([1cf4a2d](https://github.com/atinc/ngx-tethys/commit/1cf4a2d)), closes [#INFR-1629](https://github.com/atinc/ngx-tethys/issues/INFR-1629)


### Features

* **util:** add type guards for isxxx functions #INFR-1626 ([#1142](https://github.com/atinc/ngx-tethys/issues/1142)) ([74a6412](https://github.com/atinc/ngx-tethys/commit/74a6412)), closes [#INFR-1626](https://github.com/atinc/ngx-tethys/issues/INFR-1626)



<a name="10.0.0-next.3"></a>
# [10.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/9.0.22...10.0.0-next.3) (2021-02-05)


### Bug Fixes

* **util:** move tiny-date.ts, fix date-fns reexported  error when build ([12cf309](https://github.com/atinc/ngx-tethys/commit/12cf309))



<a name="10.0.0-next.1"></a>
# [10.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/9.0.15...10.0.0-next.1) (2021-01-15)


### Bug Fixes

* **store:** add @Injectable() for fix build RootStore error ([3639884](https://github.com/atinc/ngx-tethys/commit/3639884))
* **util:** change tiny-date export function ([4919756](https://github.com/atinc/ngx-tethys/commit/4919756))


### Features

* **tree-select:** tree select support search, #INFR-1542 ([78e80ed](https://github.com/atinc/ngx-tethys/commit/78e80ed)), closes [#INFR-1542](https://github.com/atinc/ngx-tethys/issues/INFR-1542)



<a name="10.0.0-next.0"></a>
# [10.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/9.0.14...10.0.0-next.0) (2021-01-04)


### Bug Fixes

* **schematics:** ts节点属性 readonly 修复 ([01b4506](https://github.com/atinc/ngx-tethys/commit/01b4506))
* **store:** fix build error: Only initialized variables and constants can be referenced in decorators ([d502fc8](https://github.com/atinc/ngx-tethys/commit/d502fc8))


### Features

* upgrade angular from 9.x to 10.x #INFR-1516 ([c47569d](https://github.com/atinc/ngx-tethys/commit/c47569d)), closes [#INFR-1516](https://github.com/atinc/ngx-tethys/issues/INFR-1516)



<a name="10.0.0-next.3"></a>
# [10.0.0-next.3](https://github.com/atinc/ngx-tethys/compare/9.0.22...10.0.0-next.3) (2021-02-05)


### Bug Fixes

* **cascader:** 传入函数this丢失 ([75028d4](https://github.com/atinc/ngx-tethys/commit/75028d4))
* **grid:** set header padding align td when size is default ([#1136](https://github.com/atinc/ngx-tethys/issues/1136)) ([ee59380](https://github.com/atinc/ngx-tethys/commit/ee59380))
* **uploader:** uploader support custom accept type, #INFR-1564 ([#1130](https://github.com/atinc/ngx-tethys/issues/1130)) ([b0e1e9c](https://github.com/atinc/ngx-tethys/commit/b0e1e9c)), closes [#INFR-1564](https://github.com/atinc/ngx-tethys/issues/INFR-1564)
* **util:** move tiny-date.ts, fix date-fns reexported  error when build ([12cf309](https://github.com/atinc/ngx-tethys/commit/12cf309))


### Features

* **guider:** support redirect to other route when change step #INFR-1543 ([#1138](https://github.com/atinc/ngx-tethys/issues/1138)) ([452283c](https://github.com/atinc/ngx-tethys/commit/452283c)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)



<a name="10.0.0-next.2"></a>
# [10.0.0-next.2](https://github.com/atinc/ngx-tethys/compare/10.0.0-next.1...10.0.0-next.2) (2021-01-18)


### Bug Fixes

* **util:** move tiny-date.ts, fix date-fns reexported  error when build ([12cf309](https://github.com/atinc/ngx-tethys/commit/12cf309))



<a name="10.0.0-next.1"></a>
# [10.0.0-next.1](https://github.com/atinc/ngx-tethys/compare/10.0.0-next.0...10.0.0-next.1) (2021-01-15)


### Bug Fixes

* **mention:** should update ngModel value when select a suggestion #INFR-1531 ([#1084](https://github.com/atinc/ngx-tethys/issues/1084)) ([94c6c19](https://github.com/atinc/ngx-tethys/commit/94c6c19)), closes [#INFR-1531](https://github.com/atinc/ngx-tethys/issues/INFR-1531) [#INFR-1531](https://github.com/atinc/ngx-tethys/issues/INFR-1531)
* **store:** add @Injectable() for fix build RootStore error ([3639884](https://github.com/atinc/ngx-tethys/commit/3639884))
* **timeline:** remove log import, #INFR-1527 ([b63469b](https://github.com/atinc/ngx-tethys/commit/b63469b)), closes [#INFR-1527](https://github.com/atinc/ngx-tethys/issues/INFR-1527)
* **util:** change tiny-date export function ([4919756](https://github.com/atinc/ngx-tethys/commit/4919756))


### Features

* **timeline:** timeline support horizontal #INFR-1527 ([#1081](https://github.com/atinc/ngx-tethys/issues/1081)) ([f6bcd12](https://github.com/atinc/ngx-tethys/commit/f6bcd12)), closes [#INFR-1527](https://github.com/atinc/ngx-tethys/issues/INFR-1527)
* #INFR-1400 【DateRangePicker】选择时间组件中，设置 thyPlaceholder 仅支持 string[]，显示为thyPlaceholder[0] ~ thyPlaceholder[1]，需要支持string，placeholder 直接显示传入的 ([d55fc5c](https://github.com/atinc/ngx-tethys/commit/d55fc5c)), closes [#INFR-1400](https://github.com/atinc/ngx-tethys/issues/INFR-1400)
* **tree-select:** tree select support search, #INFR-1542 ([78e80ed](https://github.com/atinc/ngx-tethys/commit/78e80ed)), closes [#INFR-1542](https://github.com/atinc/ngx-tethys/issues/INFR-1542)



<a name="10.0.0-next.0"></a>
# [10.0.0-next.0](https://github.com/atinc/ngx-tethys/compare/9.0.14...10.0.0-next.0) (2021-01-04)


### Bug Fixes

* **fullscreen:** add fullscreenchange and keydown events listeners in ThyFullscreenService #INFR-1403 ([#1067](https://github.com/atinc/ngx-tethys/issues/1067)) ([6452e28](https://github.com/atinc/ngx-tethys/commit/6452e28)), closes [#INFR-1403](https://github.com/atinc/ngx-tethys/issues/INFR-1403)
* **schematics:** ts节点属性 readonly 修复 ([01b4506](https://github.com/atinc/ngx-tethys/commit/01b4506))


### Features

* upgrade angular from 9.x to 10.x #INFR-1516 ([c47569d](https://github.com/atinc/ngx-tethys/commit/c47569d)), closes [#INFR-1516](https://github.com/atinc/ngx-tethys/issues/INFR-1516)


<a name="9.0.24"></a>
## [9.0.24](https://github.com/atinc/ngx-tethys/compare/9.0.23...9.0.24) (2021-02-19)


### Bug Fixes

* **guider:** rename config property name #INFR-1633 ([a0dccc7](https://github.com/atinc/ngx-tethys/commit/a0dccc7)), closes [#INFR-1633](https://github.com/atinc/ngx-tethys/issues/INFR-1633)
* **input:** append bg color should be disabled when input is disabled #INFR-1630 ([31d083b](https://github.com/atinc/ngx-tethys/commit/31d083b)), closes [#INFR-1630](https://github.com/atinc/ngx-tethys/issues/INFR-1630)


### Features

* **divider:** add divider component #INFR-228 ([#1145](https://github.com/atinc/ngx-tethys/issues/1145)) ([8e3b1d8](https://github.com/atinc/ngx-tethys/commit/8e3b1d8)), closes [#INFR-228](https://github.com/atinc/ngx-tethys/issues/INFR-228)
* **guider:** support add panel class for guider #INFR-1633 ([212a6b1](https://github.com/atinc/ngx-tethys/commit/212a6b1)), closes [#INFR-1633](https://github.com/atinc/ngx-tethys/issues/INFR-1633)
* support thyRangePicker select date range #INFR-1620 ([#1139](https://github.com/atinc/ngx-tethys/issues/1139)) ([67374ed](https://github.com/atinc/ngx-tethys/commit/67374ed)), closes [#INFR-1620](https://github.com/atinc/ngx-tethys/issues/INFR-1620) [#INFR-1620](https://github.com/atinc/ngx-tethys/issues/INFR-1620) [#INFR-1620](https://github.com/atinc/ngx-tethys/issues/INFR-1620)



<a name="9.0.23"></a>
## [9.0.23](https://github.com/atinc/ngx-tethys/compare/9.0.22...9.0.23) (2021-02-05)


### Bug Fixes

* **cascader:** 传入函数this丢失 ([75028d4](https://github.com/atinc/ngx-tethys/commit/75028d4))
* **grid:** set header padding align td when size is default ([#1136](https://github.com/atinc/ngx-tethys/issues/1136)) ([ee59380](https://github.com/atinc/ngx-tethys/commit/ee59380))
* **uploader:** uploader support custom accept type, #INFR-1564 ([#1130](https://github.com/atinc/ngx-tethys/issues/1130)) ([b0e1e9c](https://github.com/atinc/ngx-tethys/commit/b0e1e9c)), closes [#INFR-1564](https://github.com/atinc/ngx-tethys/issues/INFR-1564)


### Features

* **card:** remove line in card-header and deprecate thyAlign in card-content #INFR-1158 ([3c2c08e](https://github.com/atinc/ngx-tethys/commit/3c2c08e)), closes [#INFR-1158](https://github.com/atinc/ngx-tethys/issues/INFR-1158)
* **guider:** support redirect to other route when change step #INFR-1543 ([#1138](https://github.com/atinc/ngx-tethys/issues/1138)) ([452283c](https://github.com/atinc/ngx-tethys/commit/452283c)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)


<a name="9.0.22"></a>
## [9.0.22](https://github.com/atinc/ngx-tethys/compare/9.0.21...9.0.22) (2021-02-03)


### Bug Fixes

* **grid:** center empty when data is [] ([#1117](https://github.com/atinc/ngx-tethys/issues/1117)) ([2604032](https://github.com/atinc/ngx-tethys/commit/2604032))
* **guider:** add guider hover color, #POR-2829 ([#1120](https://github.com/atinc/ngx-tethys/issues/1120)) ([2f3f2c8](https://github.com/atinc/ngx-tethys/commit/2f3f2c8)), closes [#POR-2829](https://github.com/atinc/ngx-tethys/issues/POR-2829) [#POR-2829](https://github.com/atinc/ngx-tethys/issues/POR-2829)
* **guider:** add guider top overflow hidden, remove guider-container shadow, #INFR-1602, #INFR-1602 ([#1123](https://github.com/atinc/ngx-tethys/issues/1123)) ([94f5994](https://github.com/atinc/ngx-tethys/commit/94f5994)), closes [#INFR-1602](https://github.com/atinc/ngx-tethys/issues/INFR-1602) [#INFR-1602](https://github.com/atinc/ngx-tethys/issues/INFR-1602)
* **guider:** closing operation dont affect each other #POR-2832 ([feff20b](https://github.com/atinc/ngx-tethys/commit/feff20b)), closes [#POR-2832](https://github.com/atinc/ngx-tethys/issues/POR-2832)
* **guider:** fix guider style ([67bc195](https://github.com/atinc/ngx-tethys/commit/67bc195))
* **guider:** fix illegal start index #INFR-1556 ([#1127](https://github.com/atinc/ngx-tethys/issues/1127)) ([2e5ac94](https://github.com/atinc/ngx-tethys/commit/2e5ac94)), closes [#INFR-1556](https://github.com/atinc/ngx-tethys/issues/INFR-1556)
* **guider:** remove description scroll ([ebf1f65](https://github.com/atinc/ngx-tethys/commit/ebf1f65))
* **guider:** remove description scroll, #INFR-1577 ([37da4a1](https://github.com/atinc/ngx-tethys/commit/37da4a1)), closes [#INFR-1577](https://github.com/atinc/ngx-tethys/issues/INFR-1577)
* **select:** fix single select ngModel change input no clear(#INFR-1561) ([#1118](https://github.com/atinc/ngx-tethys/issues/1118)) ([f70b92a](https://github.com/atinc/ngx-tethys/commit/f70b92a)), closes [#INFR-1561](https://github.com/atinc/ngx-tethys/issues/INFR-1561) [#INFR-1561](https://github.com/atinc/ngx-tethys/issues/INFR-1561) [#INFR-1561](https://github.com/atinc/ngx-tethys/issues/INFR-1561)
* **uploader:** fix upload in safari support xls and xlsx type, #INFR-1564 ([#1121](https://github.com/atinc/ngx-tethys/issues/1121)) ([e52cbeb](https://github.com/atinc/ngx-tethys/commit/e52cbeb)), closes [#INFR-1564](https://github.com/atinc/ngx-tethys/issues/INFR-1564)


### Features

* **avatar:** use defaultName when img load error #INFR-447 ([#1126](https://github.com/atinc/ngx-tethys/issues/1126)) ([85d9152](https://github.com/atinc/ngx-tethys/commit/85d9152)), closes [#INFR-447](https://github.com/atinc/ngx-tethys/issues/INFR-447) [#INFR-447](https://github.com/atinc/ngx-tethys/issues/INFR-447) [#INFR-447](https://github.com/atinc/ngx-tethys/issues/INFR-447) [#INFR-447](https://github.com/atinc/ngx-tethys/issues/INFR-447)
* **guider:** add stepInfo in guider tip component #INFR-1543 ([#1116](https://github.com/atinc/ngx-tethys/issues/1116)) ([bf3db6b](https://github.com/atinc/ngx-tethys/commit/bf3db6b)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)
* **uploader:** #INFR-1554 Added json type ([bbe8157](https://github.com/atinc/ngx-tethys/commit/bbe8157)), closes [#INFR-1554](https://github.com/atinc/ngx-tethys/issues/INFR-1554)



<a name="9.0.21"></a>
## [9.0.21](https://github.com/atinc/ngx-tethys/compare/9.0.20...9.0.21) (2021-01-26)


### Bug Fixes

* **grid:** #INFR-1498 【Grid】数据为空时，空页面不居中 ([#1105](https://github.com/atinc/ngx-tethys/issues/1105)) ([deb9722](https://github.com/atinc/ngx-tethys/commit/deb9722)), closes [#INFR-1498](https://github.com/atinc/ngx-tethys/issues/INFR-1498)
* **guider:** close previous overlay when start same guider #INFR-1543 ([513c2d1](https://github.com/atinc/ngx-tethys/commit/513c2d1)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)
* **guider:** modify tip origin is target and auto offset #INFR-1543 ([66b5bda](https://github.com/atinc/ngx-tethys/commit/66b5bda)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)



<a name="9.0.20"></a>
## [9.0.20](https://github.com/atinc/ngx-tethys/compare/9.0.19...9.0.20) (2021-01-25)


### Bug Fixes

* **guider:** fix guider jump text color, #POR-2804 ([cc653ea](https://github.com/atinc/ngx-tethys/commit/cc653ea)), closes [#POR-2804](https://github.com/atinc/ngx-tethys/issues/POR-2804)
* **guider:** fix guider tip finish margin left ([1c9d137](https://github.com/atinc/ngx-tethys/commit/1c9d137))
* **guider:** use popoverRef to close privious tip #INFR-1543 ([909e824](https://github.com/atinc/ngx-tethys/commit/909e824)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)



<a name="9.0.19"></a>
## [9.0.19](https://github.com/atinc/ngx-tethys/compare/9.0.18...9.0.19) (2021-01-22)


### Bug Fixes

* **guider:** point default position is rightBottom #INFR-1543 ([42f97c7](https://github.com/atinc/ngx-tethys/commit/42f97c7)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)



<a name="9.0.18"></a>
## [9.0.18](https://github.com/atinc/ngx-tethys/compare/9.0.17...9.0.18) (2021-01-22)


### Bug Fixes

* **guider:** modify the priority of the position #INFR-1543 ([#1106](https://github.com/atinc/ngx-tethys/issues/1106)) ([7dcf26e](https://github.com/atinc/ngx-tethys/commit/7dcf26e)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)
* **guider:** reset default point position and add pointOffset #INFR-1543 ([#1104](https://github.com/atinc/ngx-tethys/issues/1104)) ([5f24f47](https://github.com/atinc/ngx-tethys/commit/5f24f47)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)


### Features

* **input:** input-search support add size, #INFR-80 ([#1097](https://github.com/atinc/ngx-tethys/issues/1097)) ([840dda3](https://github.com/atinc/ngx-tethys/commit/840dda3)), closes [#INFR-80](https://github.com/atinc/ngx-tethys/issues/INFR-80)



<a name="9.0.17"></a>
## [9.0.17](https://github.com/atinc/ngx-tethys/compare/9.0.16...9.0.17) (2021-01-20)


### Bug Fixes

* **uploader:** 修复页面中可点击的元素可拖拽上传的问题(#INFR-1329) ([edd07c3](https://github.com/atinc/ngx-tethys/commit/edd07c3)), closes [#INFR-1329](https://github.com/atinc/ngx-tethys/issues/INFR-1329)


### Features

* **guider:** guider tip and guider point #INFR-1543 ([#1102](https://github.com/atinc/ngx-tethys/issues/1102)) ([68253d9](https://github.com/atinc/ngx-tethys/commit/68253d9)), closes [#INFR-1543](https://github.com/atinc/ngx-tethys/issues/INFR-1543)
* **notify:** #INFR-1551 支持 detail 配置查看文案以及点击链接行为 ([#1094](https://github.com/atinc/ngx-tethys/issues/1094)) ([e44b75d](https://github.com/atinc/ngx-tethys/commit/e44b75d)), closes [#INFR-1551](https://github.com/atinc/ngx-tethys/issues/INFR-1551) [#INFR-1551](https://github.com/atinc/ngx-tethys/issues/INFR-1551)



<a name="9.0.16"></a>
## [9.0.16](https://github.com/atinc/ngx-tethys/compare/9.0.15...9.0.16) (2021-01-18)


### Bug Fixes

* **layout:** update thy-layout-content-main's display as flex #INFR-1546 ([3aa2820](https://github.com/atinc/ngx-tethys/commit/3aa2820)), closes [#INFR-1546](https://github.com/atinc/ngx-tethys/issues/INFR-1546)
* **select:** add keydown stop propagation #INFR-1160 ([12c806e](https://github.com/atinc/ngx-tethys/commit/12c806e)), closes [#INFR-1160](https://github.com/atinc/ngx-tethys/issues/INFR-1160)
* **select:** cancel stop propagation in select #INFR-1160 ([adb6394](https://github.com/atinc/ngx-tethys/commit/adb6394)), closes [#INFR-1160](https://github.com/atinc/ngx-tethys/issues/INFR-1160)
* **timeline:** fix timeline data update #INFR-1536 ([e914b30](https://github.com/atinc/ngx-tethys/commit/e914b30)), closes [#INFR-1536](https://github.com/atinc/ngx-tethys/issues/INFR-1536)


### Features

* **tree-select:** tree select support search, #INFR-1542 ([a691bd3](https://github.com/atinc/ngx-tethys/commit/a691bd3)), closes [#INFR-1542](https://github.com/atinc/ngx-tethys/issues/INFR-1542)



<a name="9.0.15"></a>
## [9.0.15](https://github.com/atinc/ngx-tethys/compare/9.0.14...9.0.15) (2021-01-07)


### Bug Fixes

* **fullscreen:** add fullscreenchange and keydown events listeners in ThyFullscreenService #INFR-1403 ([#1067](https://github.com/atinc/ngx-tethys/issues/1067)) ([6452e28](https://github.com/atinc/ngx-tethys/commit/6452e28)), closes [#INFR-1403](https://github.com/atinc/ngx-tethys/issues/INFR-1403)
* **mention:** should update ngModel value when select a suggestion #INFR-1531 ([#1084](https://github.com/atinc/ngx-tethys/issues/1084)) ([94c6c19](https://github.com/atinc/ngx-tethys/commit/94c6c19)), closes [#INFR-1531](https://github.com/atinc/ngx-tethys/issues/INFR-1531) [#INFR-1531](https://github.com/atinc/ngx-tethys/issues/INFR-1531)
* **timeline:** remove log import, #INFR-1527 ([b63469b](https://github.com/atinc/ngx-tethys/commit/b63469b)), closes [#INFR-1527](https://github.com/atinc/ngx-tethys/issues/INFR-1527)


### Features

* **timeline:** timeline support horizontal #INFR-1527 ([#1081](https://github.com/atinc/ngx-tethys/issues/1081)) ([f6bcd12](https://github.com/atinc/ngx-tethys/commit/f6bcd12)), closes [#INFR-1527](https://github.com/atinc/ngx-tethys/issues/INFR-1527)
* #INFR-1400 【DateRangePicker】选择时间组件中，设置 thyPlaceholder 仅支持 string[]，显示为thyPlaceholder[0] ~ thyPlaceholder[1]，需要支持string，placeholder 直接显示传入的 ([d55fc5c](https://github.com/atinc/ngx-tethys/commit/d55fc5c)), closes [#INFR-1400](https://github.com/atinc/ngx-tethys/issues/INFR-1400)



<a name="9.0.14"></a>
## [9.0.14](https://github.com/atinc/ngx-tethys/compare/9.0.13...9.0.14) (2020-12-28)


### Bug Fixes

* **calendar:** #AE-3897 点击日历外部，去掉选中 ([#1076](https://github.com/atinc/ngx-tethys/issues/1076)) ([80cbdce](https://github.com/atinc/ngx-tethys/commit/80cbdce)), closes [#AE-3897](https://github.com/atinc/ngx-tethys/issues/AE-3897) [#AE-3897](https://github.com/atinc/ngx-tethys/issues/AE-3897)


### Features

* **copy:** support thyCopyTips #INFR-1496 ([#1077](https://github.com/atinc/ngx-tethys/issues/1077)) ([c659649](https://github.com/atinc/ngx-tethys/commit/c659649)), closes [#INFR-1496](https://github.com/atinc/ngx-tethys/issues/INFR-1496) [#INFR-1496](https://github.com/atinc/ngx-tethys/issues/INFR-1496)


<a name="9.0.13"></a>
## [9.0.13](https://github.com/atinc/ngx-tethys/compare/9.0.12...9.0.13) (2020-12-28)


### Features

* **uploader:** add file size threshold and size exceeds handler for file select and drop component  #INFR-1495  ([3f2d69d](https://github.com/atinc/ngx-tethys/commit/3f2d69d)), closes [#INFR-1495](https://github.com/atinc/ngx-tethys/issues/INFR-1495)



<a name="9.0.12"></a>
## [9.0.12](https://github.com/atinc/ngx-tethys/compare/9.0.11...9.0.12) (2020-12-25)


### Bug Fixes

* **calendar:** #AE-3898 发布计划——版本名称太长时hover穿透 ([#1070](https://github.com/atinc/ngx-tethys/issues/1070)) ([7aaf09b](https://github.com/atinc/ngx-tethys/commit/7aaf09b)), closes [#AE-3898](https://github.com/atinc/ngx-tethys/issues/AE-3898)
* **empty:** fix empty component vertical middle ([#1068](https://github.com/atinc/ngx-tethys/issues/1068)) ([3160a00](https://github.com/atinc/ngx-tethys/commit/3160a00))
* **empty:** fix empty massage color #AE-3882 ([#1071](https://github.com/atinc/ngx-tethys/issues/1071)) ([a30488d](https://github.com/atinc/ngx-tethys/commit/a30488d)), closes [#AE-3882](https://github.com/atinc/ngx-tethys/issues/AE-3882) [#AE-3882](https://github.com/atinc/ngx-tethys/issues/AE-3882)


### Features

* **select:** select empty style #INFR-1417 ([d7c96ce](https://github.com/atinc/ngx-tethys/commit/d7c96ce)), closes [#INFR-1417](https://github.com/atinc/ngx-tethys/issues/INFR-1417)
* **select:** support thyHasBackdrop #INFR-1421 ([#1064](https://github.com/atinc/ngx-tethys/issues/1064)) ([74296f6](https://github.com/atinc/ngx-tethys/commit/74296f6)), closes [#INFR-1421](https://github.com/atinc/ngx-tethys/issues/INFR-1421) [#INFR-1421](https://github.com/atinc/ngx-tethys/issues/INFR-1421)



<a name="9.0.11"></a>
## [9.0.11](https://github.com/atinc/ngx-tethys/compare/9.0.10...9.0.11) (2020-12-19)


### Bug Fixes

* **grid:** add grid group mode test ([8d2f0d2](https://github.com/atinc/ngx-tethys/commit/8d2f0d2))


### Features

* **label:** add thyLabelBackgroundOpacity to label #INFR-1418 ([3724e1a](https://github.com/atinc/ngx-tethys/commit/3724e1a)), closes [#INFR-1418](https://github.com/atinc/ngx-tethys/issues/INFR-1418)
* **select:** select component empty style #INFR-1417 ([#1059](https://github.com/atinc/ngx-tethys/issues/1059)) ([a2a3669](https://github.com/atinc/ngx-tethys/commit/a2a3669)), closes [#INFR-1417](https://github.com/atinc/ngx-tethys/issues/INFR-1417)



<a name="9.0.10"></a>
## [9.0.10](https://github.com/atinc/ngx-tethys/compare/9.0.9...9.0.10) (2020-12-18)


### Bug Fixes

* **empty:** fix set empty state style ([#1056](https://github.com/atinc/ngx-tethys/issues/1056)) ([297dbc8](https://github.com/atinc/ngx-tethys/commit/297dbc8))
* **fullscreen:** change StyxFullscreenService to ThyFullscreen ([9f46852](https://github.com/atinc/ngx-tethys/commit/9f46852))
* **grid:** fix group mode data presentation abnormal ([#1044](https://github.com/atinc/ngx-tethys/issues/1044)) ([6cb9d71](https://github.com/atinc/ngx-tethys/commit/6cb9d71))


### Features

* **calendar:** #AE-3801 calendar style ([a836e02](https://github.com/atinc/ngx-tethys/commit/a836e02)), closes [#AE-3801](https://github.com/atinc/ngx-tethys/issues/AE-3801)
* **datepicker:** add warnDeprecation to offset and hasBackdrop #INFR-1322 ([957cccc](https://github.com/atinc/ngx-tethys/commit/957cccc)), closes [#INFR-1322](https://github.com/atinc/ngx-tethys/issues/INFR-1322)
* **empty:** empty component add sm size #INFR-1416 ([#1057](https://github.com/atinc/ngx-tethys/issues/1057)) ([45f7252](https://github.com/atinc/ngx-tethys/commit/45f7252)), closes [#INFR-1416](https://github.com/atinc/ngx-tethys/issues/INFR-1416) [#INFR-1416](https://github.com/atinc/ngx-tethys/issues/INFR-1416)
* **empty:** refactor empty component #INFR-1395 ([#1051](https://github.com/atinc/ngx-tethys/issues/1051)) ([2db73a4](https://github.com/atinc/ngx-tethys/commit/2db73a4)), closes [#INFR-1395](https://github.com/atinc/ngx-tethys/issues/INFR-1395) [#INFR-1395](https://github.com/atinc/ngx-tethys/issues/INFR-1395)
* **empty:** remove grid empty thyIconClass #INFR-1395 ([fd33f7f](https://github.com/atinc/ngx-tethys/commit/fd33f7f)), closes [#INFR-1395](https://github.com/atinc/ngx-tethys/issues/INFR-1395) [#INFR-1395](https://github.com/atinc/ngx-tethys/issues/INFR-1395)
* **grid:** set empty template when model=[] ([#1052](https://github.com/atinc/ngx-tethys/issues/1052)) ([363ebd5](https://github.com/atinc/ngx-tethys/commit/363ebd5)), closes [#INFR-1393](https://github.com/atinc/ngx-tethys/issues/INFR-1393)



<a name="9.0.9"></a>
## [9.0.9](https://github.com/atinc/ngx-tethys/compare/9.0.8...9.0.9) (2020-12-11)


### Bug Fixes

* **grid:** fix tree mode td style ([#1046](https://github.com/atinc/ngx-tethys/issues/1046)) ([2da8b3f](https://github.com/atinc/ngx-tethys/commit/2da8b3f))


### Features

* **datepicker:** add thyStopPropagation to date-picker directive (#INFR-1351) ([#1045](https://github.com/atinc/ngx-tethys/issues/1045)) ([f05781b](https://github.com/atinc/ngx-tethys/commit/f05781b)), closes [#INFR-1351](https://github.com/atinc/ngx-tethys/issues/INFR-1351) [#INFR-1351](https://github.com/atinc/ngx-tethys/issues/INFR-1351) [#INFR-1351](https://github.com/atinc/ngx-tethys/issues/INFR-1351) [#INFR-1351](https://github.com/atinc/ngx-tethys/issues/INFR-1351) [#INFR-1351](https://github.com/atinc/ngx-tethys/issues/INFR-1351)
* **popover:** add thy-popover-header and thy-popover-body (#INFR-1339) ([#1042](https://github.com/atinc/ngx-tethys/issues/1042)) ([be3abdc](https://github.com/atinc/ngx-tethys/commit/be3abdc)), closes [#INFR-1339](https://github.com/atinc/ngx-tethys/issues/INFR-1339)



<a name="9.0.8"></a>
## [9.0.8](https://github.com/atinc/ngx-tethys/compare/9.0.7...9.0.8) (2020-12-10)


### Bug Fixes

* **autocomplete:** set default offset as 4 and fix baisc example #INFR-1335 ([64fa9df](https://github.com/atinc/ngx-tethys/commit/64fa9df)), closes [#INFR-1335](https://github.com/atinc/ngx-tethys/issues/INFR-1335)
* **date-picker:** date-picker directive placement default bottom (#INFR-1336) ([#1039](https://github.com/atinc/ngx-tethys/issues/1039)) ([5d01829](https://github.com/atinc/ngx-tethys/commit/5d01829)), closes [#INFR-1336](https://github.com/atinc/ngx-tethys/issues/INFR-1336) [#INFR-1336](https://github.com/atinc/ngx-tethys/issues/INFR-1336) [#INFR-1336](https://github.com/atinc/ngx-tethys/issues/INFR-1336)
* **form:** fix when the form layout is vertical and there is no label to hide the label ([1eb34ff](https://github.com/atinc/ngx-tethys/commit/1eb34ff))


### Features

* **grid:** stom expand icon display column in tree mode #INFR-1340 ([#1040](https://github.com/atinc/ngx-tethys/issues/1040)) ([3c4cfae](https://github.com/atinc/ngx-tethys/commit/3c4cfae)), closes [#INFR-1340](https://github.com/atinc/ngx-tethys/issues/INFR-1340)



<a name="9.0.7"></a>
## [9.0.7](https://github.com/atinc/ngx-tethys/compare/9.0.6...9.0.7) (2020-12-09)


### Bug Fixes

* **schematics:** fix directoryExists logic, should return true when contains subfiles or contains subdirs ([2961080](https://github.com/atinc/ngx-tethys/commit/2961080))



<a name="9.0.6"></a>
## [9.0.6](https://github.com/atinc/ngx-tethys/compare/9.0.5...9.0.6) (2020-12-07)


### Bug Fixes

* **date-picker:** change offset to 4px for date-picker (#INFR-1341) ([8024bcc](https://github.com/atinc/ngx-tethys/commit/8024bcc)), closes [#INFR-1341](https://github.com/atinc/ngx-tethys/issues/INFR-1341)
* **schematics:** fix ng update change rule (helpers) #INFR-1294 ([66bbf4e](https://github.com/atinc/ngx-tethys/commit/66bbf4e)), closes [#INFR-1294](https://github.com/atinc/ngx-tethys/issues/INFR-1294)
* ng update ([332de83](https://github.com/atinc/ngx-tethys/commit/332de83))
* update peerDependencies only ^9.0.0 ([413ac61](https://github.com/atinc/ngx-tethys/commit/413ac61))



<a name="9.0.5"></a>
## [9.0.5](https://github.com/atinc/ngx-tethys/compare/9.0.4...9.0.5) (2020-12-05)


### Features

* **schematics:** add migration to v9.x schematics #INFR-1294 ([61e9da1](https://github.com/atinc/ngx-tethys/commit/61e9da1)), closes [#INFR-1294](https://github.com/atinc/ngx-tethys/issues/INFR-1294)



<a name="9.0.4"></a>
## [9.0.4](https://github.com/atinc/ngx-tethys/compare/9.0.2...9.0.4) (2020-12-04)


### Bug Fixes

* update package-lock.json ([c54aa7d](https://github.com/atinc/ngx-tethys/commit/c54aa7d))
* **schematics:** update deps as peerDependencies, and add deps to package.json for ng-add #INFR-1327 ([#1020](https://github.com/atinc/ngx-tethys/issues/1020)) ([0079a31](https://github.com/atinc/ngx-tethys/commit/0079a31)), closes [#INFR-1327](https://github.com/atinc/ngx-tethys/issues/INFR-1327)


### Features

* **icon:** add printErrorWhenNotFound config for test #INFR-1330 ([f8bbf9d](https://github.com/atinc/ngx-tethys/commit/f8bbf9d)), closes [#INFR-1330](https://github.com/atinc/ngx-tethys/issues/INFR-1330)
* **testing:** move testing to root folder from core #INFR-1330 ([ae9ea68](https://github.com/atinc/ngx-tethys/commit/ae9ea68)), closes [#INFR-1330](https://github.com/atinc/ngx-tethys/issues/INFR-1330)



<a name="9.0.3"></a>
## [9.0.3](https://github.com/atinc/ngx-tethys/compare/9.0.2...9.0.3) (2020-12-04)


### Bug Fixes

* **schematics:** update deps as peerDependencies, and add deps to package.json for ng-add #INFR-1327 ([#1020](https://github.com/atinc/ngx-tethys/issues/1020)) ([0079a31](https://github.com/atinc/ngx-tethys/commit/0079a31)), closes [#INFR-1327](https://github.com/atinc/ngx-tethys/issues/INFR-1327)



<a name="9.0.2"></a>
## [9.0.2](https://github.com/atinc/ngx-tethys/compare/9.0.1...9.0.2) (2020-12-03)



<a name="9.0.1"></a>
## [9.0.1](https://github.com/atinc/ngx-tethys/compare/9.0.0...9.0.1) (2020-12-03)


### Bug Fixes

* remove warnDeprecation from public-api for fix error " Cannot enable prod mode after platform setup" ([7871f01](https://github.com/atinc/ngx-tethys/commit/7871f01))



<a name="9.0.0"></a>
# [9.0.0](https://github.com/atinc/ngx-tethys/compare/8.1.32...9.0.0) (2020-12-02)


### Bug Fixes

* **schematics:** add schema config for ng-add in collection.json #INFR-1293 ([#1006](https://github.com/atinc/ngx-tethys/issues/1006)) ([5f29d84](https://github.com/atinc/ngx-tethys/commit/5f29d84)), closes [#INFR-1293](https://github.com/atinc/ngx-tethys/issues/INFR-1293)



<a name="9.0.0-beta.4"></a>
# [9.0.0-beta.4](https://github.com/atinc/ngx-tethys/compare/9.0.0-beta.3...9.0.0-beta.4) (2020-12-02)


### Bug Fixes

* **date-picker:** register zh-Hans locale ([1d1589b](https://github.com/atinc/ngx-tethys/commit/1d1589b))


### Features

* **schematics:** add ng-add schematic #INFR-1293  ([4ac352f](https://github.com/atinc/ngx-tethys/commit/4ac352f)), closes [#INFR-1293](https://github.com/atinc/ngx-tethys/issues/INFR-1293)



<a name="9.0.0-beta.3"></a>
# [9.0.0-beta.3](https://github.com/atinc/ngx-tethys/compare/8.1.31...9.0.0-beta.3) (2020-11-30)


### Code Refactoring

* **styles:** delete scrollbar style ([17a36a1](https://github.com/atinc/ngx-tethys/commit/17a36a1))


### BREAKING CHANGES

* **styles:** remove the `scrollbar` default style



<a name="9.0.0-beta.2"></a>
# [9.0.0-beta.2](https://github.com/atinc/ngx-tethys/compare/8.1.30...9.0.0-beta.2) (2020-11-27)


### Features

* remove modal, datepicker, confirm and popbox module #INFR-1295 ([50362d5](https://github.com/atinc/ngx-tethys/commit/50362d5)), closes [#INFR-1295](https://github.com/atinc/ngx-tethys/issues/INFR-1295)
* **styles:** add basic and index scss bundle #INFR-1296 ([#983](https://github.com/atinc/ngx-tethys/issues/983)) ([cc895c4](https://github.com/atinc/ngx-tethys/commit/cc895c4)), closes [#INFR-1296](https://github.com/atinc/ngx-tethys/issues/INFR-1296) [#INFR-1296](https://github.com/atinc/ngx-tethys/issues/INFR-1296)
* 移除三级入口 ([cd903b3](https://github.com/atinc/ngx-tethys/commit/cd903b3))
* remove key-select module ([87e5b27](https://github.com/atinc/ngx-tethys/commit/87e5b27))


### BREAKING CHANGES

* please remove deps for this module, replace modal with dialog, replace popbox with popover, replace confirm with dialog's confirm, replace datepicker with date-picker



<a name="9.0.0-beta.1"></a>
# [9.0.0-beta.1](https://github.com/atinc/ngx-tethys/compare/9.0.0-beta.0...9.0.0-beta.1) (2020-11-27)


### Bug Fixes

* fix generate import relative path when extends mixin class ([c4fed45](https://github.com/atinc/ngx-tethys/commit/c4fed45))



<a name="9.0.0-beta.0"></a>
# [9.0.0-beta.0](https://github.com/atinc/ngx-tethys/compare/8.1.29...9.0.0-beta.0) (2020-11-26)


### Features

* update ng to 9.x and use ng build  ([1954ef7](https://github.com/atinc/ngx-tethys/commit/1954ef7))



<a name="9.0.0-beta.4"></a>
# [9.0.0-beta.4](https://github.com/atinc/ngx-tethys/compare/9.0.0-beta.3...9.0.0-beta.4) (2020-12-02)


### Bug Fixes

* **date-picker:** register zh-Hans locale ([1d1589b](https://github.com/atinc/ngx-tethys/commit/1d1589b))


### Features

* **schematics:** add ng-add schematic #INFR-1293  ([4ac352f](https://github.com/atinc/ngx-tethys/commit/4ac352f)), closes [#INFR-1293](https://github.com/atinc/ngx-tethys/issues/INFR-1293)



<a name="9.0.0-beta.3"></a>
# [9.0.0-beta.3](https://github.com/atinc/ngx-tethys/compare/8.1.31...9.0.0-beta.3) (2020-11-30)


### Code Refactoring

* **styles:** delete scrollbar style ([17a36a1](https://github.com/atinc/ngx-tethys/commit/17a36a1))


### BREAKING CHANGES

* **styles:** remove the `scrollbar` default style

### BREAKING CHANGES

* please remove deps for this module, replace modal with dialog, replace popbox with popover, replace confirm with dialog's confirm, replace datepicker with date-picker



<a name="9.0.0-beta.2"></a>
# [9.0.0-beta.2](https://github.com/atinc/ngx-tethys/compare/8.1.30...9.0.0-beta.2) (2020-11-27)

### Bug Fixes

* **menu:** modify pop-box to popover #INFR-1289 ([27f5acd](https://github.com/atinc/ngx-tethys/commit/27f5acd)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)
* **menu:** remove ThyPopBoxService  #INFR-1289 ([a31b3c1](https://github.com/atinc/ngx-tethys/commit/a31b3c1)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)
* **mune:** remove popbox in mune and test #INFR-1289 ([fba6c04](https://github.com/atinc/ngx-tethys/commit/fba6c04)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)


### Features

* remove key-select module ([87e5b27](https://github.com/atinc/ngx-tethys/commit/87e5b27))
* **styles:** add basic and index scss bundle #INFR-1296 ([#983](https://github.com/atinc/ngx-tethys/issues/983)) ([cc895c4](https://github.com/atinc/ngx-tethys/commit/cc895c4)), closes [#INFR-1296](https://github.com/atinc/ngx-tethys/issues/INFR-1296) [#INFR-1296](https://github.com/atinc/ngx-tethys/issues/INFR-1296)
* **timeline:** add timeline component  #INFR-896 ([#907](https://github.com/atinc/ngx-tethys/issues/907)) ([52dca3f](https://github.com/atinc/ngx-tethys/commit/52dca3f)), closes [#INFR-896](https://github.com/atinc/ngx-tethys/issues/INFR-896) [#INFR-896](https://github.com/atinc/ngx-tethys/issues/INFR-896)
* remove modal, datepicker, confirm and popbox module #INFR-1295 ([50362d5](https://github.com/atinc/ngx-tethys/commit/50362d5)), closes [#INFR-1295](https://github.com/atinc/ngx-tethys/issues/INFR-1295)
* 移除三级入口 ([cd903b3](https://github.com/atinc/ngx-tethys/commit/cd903b3))


### BREAKING CHANGES

* please remove deps for this module, replace modal with dialog, replace popbox with popover, replace confirm with dialog's confirm, replace datepicker with date-picker



<a name="9.0.0-beta.1"></a>
# [9.0.0-beta.1](https://github.com/atinc/ngx-tethys/compare/9.0.0-beta.0...9.0.0-beta.1) (2020-11-27)


### Bug Fixes

* fix generate import relative path when extends mixin class ([c4fed45](https://github.com/atinc/ngx-tethys/commit/c4fed45))



<a name="9.0.0-beta.0"></a>
# [9.0.0-beta.0](https://github.com/atinc/ngx-tethys/compare/8.1.29...9.0.0-beta.0) (2020-11-26)


### Features

* update ng to 9.x and use ng build  ([1954ef7](https://github.com/atinc/ngx-tethys/commit/1954ef7))

### Bug Fixes

* fix generate import relative path when extends mixin class ([c4fed45](https://github.com/atinc/ngx-tethys/commit/c4fed45))


<a name="8.1.32"></a>
## [8.1.32](https://github.com/atinc/ngx-tethys/compare/8.1.31...8.1.32) (2020-12-02)


### Bug Fixes

* **popover:** fix the problem of close container when click inside #INFR-1317 ([#1003](https://github.com/atinc/ngx-tethys/issues/1003)) ([e6a0fd9](https://github.com/atinc/ngx-tethys/commit/e6a0fd9)), closes [#INFR-1317](https://github.com/atinc/ngx-tethys/issues/INFR-1317)


### Features

* **select:** support thyAutoExpend ([#998](https://github.com/atinc/ngx-tethys/issues/998)) ([3264141](https://github.com/atinc/ngx-tethys/commit/3264141))


<a name="8.1.31"></a>
## [8.1.31](https://github.com/atinc/ngx-tethys/compare/8.1.30...8.1.31) (2020-11-30)


### Bug Fixes

* **menu:** modify pop-box to popover #INFR-1289 ([27f5acd](https://github.com/atinc/ngx-tethys/commit/27f5acd)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)
* **menu:** remove ThyPopBoxService  #INFR-1289 ([a31b3c1](https://github.com/atinc/ngx-tethys/commit/a31b3c1)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)
* **mune:** remove popbox in mune and test #INFR-1289 ([fba6c04](https://github.com/atinc/ngx-tethys/commit/fba6c04)), closes [#INFR-1289](https://github.com/atinc/ngx-tethys/issues/INFR-1289)
* **tree:** hide drag icon when tree with thyBeforeDragStart #INFR-489 ([#953](https://github.com/atinc/ngx-tethys/issues/953)) ([abfdf86](https://github.com/atinc/ngx-tethys/commit/abfdf86)), closes [#INFR-489](https://github.com/atinc/ngx-tethys/issues/INFR-489)


### Features

* **fullscreen:** add fullscreen module #INFR-250 ([#990](https://github.com/atinc/ngx-tethys/issues/990)) ([32b0a04](https://github.com/atinc/ngx-tethys/commit/32b0a04)), closes [#INFR-250](https://github.com/atinc/ngx-tethys/issues/INFR-250)
* **timeline:** add timeline component  #INFR-896 ([#907](https://github.com/atinc/ngx-tethys/issues/907)) ([52dca3f](https://github.com/atinc/ngx-tethys/commit/52dca3f)), closes [#INFR-896](https://github.com/atinc/ngx-tethys/issues/INFR-896) [#INFR-896](https://github.com/atinc/ngx-tethys/issues/INFR-896)


<a name="8.1.30"></a>
## [8.1.30](https://github.com/atinc/ngx-tethys/compare/8.1.29...8.1.30) (2020-11-27)


### Features

* **date-picker:** support hasBackdrop ([#978](https://github.com/atinc/ngx-tethys/issues/978)) ([25b24c6](https://github.com/atinc/ngx-tethys/commit/25b24c6))


<a name="8.1.29"></a>
## [8.1.29](https://github.com/atinc/ngx-tethys/compare/8.1.28...8.1.29) (2020-11-25)


### Bug Fixes

* fix notify service removeItemById #INFR-1192 ([#960](https://github.com/atinc/ngx-tethys/issues/960)) ([15a5c70](https://github.com/atinc/ngx-tethys/commit/15a5c70)), closes [#INFR-1192](https://github.com/atinc/ngx-tethys/issues/INFR-1192) [#INFR-1192](https://github.com/atinc/ngx-tethys/issues/INFR-1192)
* **input:**  fix input hover disabled style ([aef4f0b](https://github.com/atinc/ngx-tethys/commit/aef4f0b))
* **list:** fix duplicate token #INFR-1274 ([1891cdb](https://github.com/atinc/ngx-tethys/commit/1891cdb)), closes [#INFR-1274](https://github.com/atinc/ngx-tethys/issues/INFR-1274)
* **slider:** make slider vertical more natural ([1058ebe](https://github.com/atinc/ngx-tethys/commit/1058ebe))


### Features

* #INFR-1192 【Notify】弹出通知支持 placement，topLeft/topRight/bottomLeft… ([#954](https://github.com/atinc/ngx-tethys/issues/954)) ([8b50408](https://github.com/atinc/ngx-tethys/commit/8b50408)), closes [#INFR-1192](https://github.com/atinc/ngx-tethys/issues/INFR-1192) [#INFR-1192](https://github.com/atinc/ngx-tethys/issues/INFR-1192) [#INFR-1192](https://github.com/atinc/ngx-tethys/issues/INFR-1192)
* **date-picker:** support placement and offset ([c1d4c8c](https://github.com/atinc/ngx-tethys/commit/c1d4c8c))



<a name="8.1.28"></a>
## [8.1.28](https://github.com/atinc/ngx-tethys/compare/8.1.27...8.1.28) (2020-11-04)


### Bug Fixes

* **calendar:** #AE-3414 日历‘今天’显示逻辑不对 ([#950](https://github.com/atinc/ngx-tethys/issues/950)) ([ff245c6](https://github.com/atinc/ngx-tethys/commit/ff245c6)), closes [#AE-3414](https://github.com/atinc/ngx-tethys/issues/AE-3414) [#AE-3414](https://github.com/atinc/ngx-tethys/issues/AE-3414)



<a name="8.1.27"></a>
## [8.1.27](https://github.com/atinc/ngx-tethys/compare/8.1.26...8.1.27) (2020-11-03)



<a name="8.1.26"></a>
## [8.1.26](https://github.com/atinc/ngx-tethys/compare/8.1.25...8.1.26) (2020-11-03)



<a name="8.1.25"></a>
## [8.1.25](https://github.com/atinc/ngx-tethys/compare/8.1.24...8.1.25) (2020-11-03)


### Bug Fixes

* **calendar:** #AE-3412 calendar显示月份 ([#945](https://github.com/atinc/ngx-tethys/issues/945)) ([80dfae6](https://github.com/atinc/ngx-tethys/commit/80dfae6)), closes [#AE-3412](https://github.com/atinc/ngx-tethys/issues/AE-3412)



<a name="8.1.24"></a>
## [8.1.24](https://github.com/atinc/ngx-tethys/compare/8.1.23...8.1.24) (2020-11-03)


### Bug Fixes

* **calendar:** #AE-3361 #AE-3362 remove tooltip and td hover ([#939](https://github.com/atinc/ngx-tethys/issues/939)) ([a645ecf](https://github.com/atinc/ngx-tethys/commit/a645ecf)), closes [#AE-3361](https://github.com/atinc/ngx-tethys/issues/AE-3361) [#AE-3362](https://github.com/atinc/ngx-tethys/issues/AE-3362)
* **grid:** change first th padding left in draggable table #INFR-1146 ([#938](https://github.com/atinc/ngx-tethys/issues/938)) ([ac4f25a](https://github.com/atinc/ngx-tethys/commit/ac4f25a)), closes [#INFR-1146](https://github.com/atinc/ngx-tethys/issues/INFR-1146)


### Features

* **date-range:** #AE-3367 custom time display ([#940](https://github.com/atinc/ngx-tethys/issues/940)) ([cc7ed6b](https://github.com/atinc/ngx-tethys/commit/cc7ed6b)), closes [#AE-3367](https://github.com/atinc/ngx-tethys/issues/AE-3367) [#AE-3367](https://github.com/atinc/ngx-tethys/issues/AE-3367)



<a name="8.1.23"></a>
## [8.1.23](https://github.com/atinc/ngx-tethys/compare/8.1.22...8.1.23) (2020-10-29)


### Bug Fixes

* **uploader:** 部分文件如key、rar等格式的文件拖拽上传失败(#INFR-1176) ([#935](https://github.com/atinc/ngx-tethys/issues/935)) ([840a8f9](https://github.com/atinc/ngx-tethys/commit/840a8f9)), closes [#INFR-1176](https://github.com/atinc/ngx-tethys/issues/INFR-1176)


### Features

* **calendar:** #INFR-1149 calendar API ([#932](https://github.com/atinc/ngx-tethys/issues/932)) ([a3caec3](https://github.com/atinc/ngx-tethys/commit/a3caec3)), closes [#INFR-1149](https://github.com/atinc/ngx-tethys/issues/INFR-1149) [#INFR-1149](https://github.com/atinc/ngx-tethys/issues/INFR-1149)



<a name="8.1.22"></a>
## [8.1.22](https://github.com/atinc/ngx-tethys/compare/8.1.21...8.1.22) (2020-10-21)


### Bug Fixes

* **grid:** fix grid row drag style #INFR-1146 ([09ea73f](https://github.com/atinc/ngx-tethys/commit/09ea73f)), closes [#INFR-1146](https://github.com/atinc/ngx-tethys/issues/INFR-1146)
* **slider:** add thyType and thyColor to change slider color #INFR-1147 ([0098536](https://github.com/atinc/ngx-tethys/commit/0098536)), closes [#INFR-1147](https://github.com/atinc/ngx-tethys/issues/INFR-1147)



<a name="8.1.21"></a>
## [8.1.21](https://github.com/atinc/ngx-tethys/compare/8.1.20...8.1.21) (2020-10-15)


### Bug Fixes

* update spacing for multiple  #INFR-1076 ([3c06044](https://github.com/atinc/ngx-tethys/commit/3c06044)), closes [#INFR-1076](https://github.com/atinc/ngx-tethys/issues/INFR-1076)


### Features

* **select:** add loading state to select #INFR-1073 ([f2ff42b](https://github.com/atinc/ngx-tethys/commit/f2ff42b)), closes [#INFR-1073](https://github.com/atinc/ngx-tethys/issues/INFR-1073)



<a name="8.1.20"></a>
## [8.1.20](https://github.com/atinc/ngx-tethys/compare/8.1.19...8.1.20) (2020-10-12)


### Bug Fixes

* **slider:** export slider component for public-api ([a98b1c4](https://github.com/atinc/ngx-tethys/commit/a98b1c4))


### Features

* **slider:** add slider component #INFR-837 ([#909](https://github.com/atinc/ngx-tethys/issues/909)) ([f60fe07](https://github.com/atinc/ngx-tethys/commit/f60fe07)), closes [#INFR-837](https://github.com/atinc/ngx-tethys/issues/INFR-837)



<a name="8.1.19"></a>
## [8.1.19](https://github.com/atinc/ngx-tethys/compare/8.1.18...8.1.19) (2020-09-28)


### Bug Fixes

* **anchor:** resolve anchor move error ([#917](https://github.com/atinc/ngx-tethys/issues/917)) ([15abbc9](https://github.com/atinc/ngx-tethys/commit/15abbc9))



<a name="8.1.18"></a>
## [8.1.18](https://github.com/atinc/ngx-tethys/compare/8.1.17...8.1.18) (2020-09-25)


### Bug Fixes

* **dialog:** dialog footer words position when align set #INFR-860 ([#911](https://github.com/atinc/ngx-tethys/issues/911)) ([33bbb37](https://github.com/atinc/ngx-tethys/commit/33bbb37)), closes [#INFR-860](https://github.com/atinc/ngx-tethys/issues/INFR-860) [#INFR-860](https://github.com/atinc/ngx-tethys/issues/INFR-860) [#INFR-860](https://github.com/atinc/ngx-tethys/issues/INFR-860) [#INFR-860](https://github.com/atinc/ngx-tethys/issues/INFR-860) [#INFR-860](https://github.com/atinc/ngx-tethys/issues/INFR-860)
* **pagination:** words bug when pageIndex set #INFR-811 ([#912](https://github.com/atinc/ngx-tethys/issues/912)) ([e25c83e](https://github.com/atinc/ngx-tethys/commit/e25c83e)), closes [#INFR-811](https://github.com/atinc/ngx-tethys/issues/INFR-811) [#INFR-811](https://github.com/atinc/ngx-tethys/issues/INFR-811) [#INFR-811](https://github.com/atinc/ngx-tethys/issues/INFR-811) [#INFR-811](https://github.com/atinc/ngx-tethys/issues/INFR-811)


### Features

* **mention:** add open suggestion popover config ([a188980](https://github.com/atinc/ngx-tethys/commit/a188980))



<a name="8.1.17"></a>
## [8.1.17](https://github.com/atinc/ngx-tethys/compare/8.1.16...8.1.17) (2020-09-04)


### Bug Fixes

* **util:** add more fn in tiny date and export date-fns #INFR-1026 ([3cbec67](https://github.com/atinc/ngx-tethys/commit/3cbec67)), closes [#INFR-1026](https://github.com/atinc/ngx-tethys/issues/INFR-1026)


### Features

* **autocomplete:** use thyAutocompleteComponent replaec thyAutocomplete #INFR-1027 ([36a8484](https://github.com/atinc/ngx-tethys/commit/36a8484)), closes [#INFR-1027](https://github.com/atinc/ngx-tethys/issues/INFR-1027)



<a name="8.1.16"></a>
## [8.1.16](https://github.com/atinc/ngx-tethys/compare/8.1.15...8.1.16) (2020-09-03)


### Bug Fixes

* **anchor:** support query element by id in contianer #INFR-1024 ([#900](https://github.com/atinc/ngx-tethys/issues/900)) ([6f09446](https://github.com/atinc/ngx-tethys/commit/6f09446)), closes [#INFR-1024](https://github.com/atinc/ngx-tethys/issues/INFR-1024)



<a name="8.1.15"></a>
## [8.1.15](https://github.com/atinc/ngx-tethys/compare/8.1.14...8.1.15) (2020-08-31)


### Bug Fixes

* **grid:** fix index column is 'NaN' bug ([a38a690](https://github.com/atinc/ngx-tethys/commit/a38a690))



<a name="8.1.14"></a>
## [8.1.14](https://github.com/atinc/ngx-tethys/compare/8.1.13...8.1.14) (2020-08-29)


### Bug Fixes

* **date-picker:** fix thyformat can not set when initial value is null #INFR-833 ([#892](https://github.com/atinc/ngx-tethys/issues/892)) ([dce678a](https://github.com/atinc/ngx-tethys/commit/dce678a)), closes [#INFR-833](https://github.com/atinc/ngx-tethys/issues/INFR-833) [#INFR-833](https://github.com/atinc/ngx-tethys/issues/INFR-833)
* **grid:** solve the sorting disorder bug caused by using ngTemplateOutlet #INFR-994 ([#894](https://github.com/atinc/ngx-tethys/issues/894)) ([204b197](https://github.com/atinc/ngx-tethys/commit/204b197)), closes [#INFR-994](https://github.com/atinc/ngx-tethys/issues/INFR-994) [#INFR-994](https://github.com/atinc/ngx-tethys/issues/INFR-994)



<a name="8.1.13"></a>
## [8.1.13](https://github.com/atinc/ngx-tethys/compare/8.1.12...8.1.13) (2020-08-26)


### Bug Fixes

* **avatar:** export avatar size variable for tethys ([381b852](https://github.com/atinc/ngx-tethys/commit/381b852))
* **avatar:** take the nearest size and complementary test #INFR-966 ([1d03aeb](https://github.com/atinc/ngx-tethys/commit/1d03aeb)), closes [#INFR-966](https://github.com/atinc/ngx-tethys/issues/INFR-966)



<a name="8.1.12"></a>
## [8.1.12](https://github.com/atinc/ngx-tethys/compare/8.1.11...8.1.12) (2020-08-22)


### Bug Fixes

* **copy:** export copy directive ([#884](https://github.com/atinc/ngx-tethys/issues/884)) ([dbd5d6f](https://github.com/atinc/ngx-tethys/commit/dbd5d6f))



<a name="8.1.11"></a>
## [8.1.11](https://github.com/atinc/ngx-tethys/compare/8.1.10...8.1.11) (2020-08-20)


### Bug Fixes

* **flexible-text:** fix IFC white space #INFR-953 ([122ff60](https://github.com/atinc/ngx-tethys/commit/122ff60)), closes [#INFR-953](https://github.com/atinc/ngx-tethys/issues/INFR-953)



<a name="8.1.10"></a>
## [8.1.10](https://github.com/atinc/ngx-tethys/compare/8.1.9...8.1.10) (2020-08-18)


### Bug Fixes

* justify footer template location #INFR-933 ([afddfc2](https://github.com/atinc/ngx-tethys/commit/afddfc2)), closes [#INFR-933](https://github.com/atinc/ngx-tethys/issues/INFR-933)
* **copy:** change test file #INFR-898 ([4f06ed7](https://github.com/atinc/ngx-tethys/commit/4f06ed7)), closes [#INFR-898](https://github.com/atinc/ngx-tethys/issues/INFR-898)
* **copy:** delete copy directive from copy directive folder #INFR-898 ([8daee09](https://github.com/atinc/ngx-tethys/commit/8daee09)), closes [#INFR-898](https://github.com/atinc/ngx-tethys/issues/INFR-898)
* **date-picker:** add padding-right to show icon when placeholder is too long #THB-1495 ([d3128e6](https://github.com/atinc/ngx-tethys/commit/d3128e6)), closes [#THB-1495](https://github.com/atinc/ngx-tethys/issues/THB-1495)
* **input:** add placeholder text-overflow style #INFR-892 ([5cef68d](https://github.com/atinc/ngx-tethys/commit/5cef68d)), closes [#INFR-892](https://github.com/atinc/ngx-tethys/issues/INFR-892)
* **input:** add placeholder text-overflow style #INFR-892 ([fe7c6f7](https://github.com/atinc/ngx-tethys/commit/fe7c6f7)), closes [#INFR-892](https://github.com/atinc/ngx-tethys/issues/INFR-892)


### Features

* **add-top:** add back-top spec and doc #wh/add-back-top-spec ([#869](https://github.com/atinc/ngx-tethys/issues/869)) ([7bd7f8f](https://github.com/atinc/ngx-tethys/commit/7bd7f8f))
* **select:** support thyFooterTemplate #INFR-933 ([#877](https://github.com/atinc/ngx-tethys/issues/877)) ([0c3db00](https://github.com/atinc/ngx-tethys/commit/0c3db00)), closes [#INFR-933](https://github.com/atinc/ngx-tethys/issues/INFR-933)



<a name="8.1.9"></a>
## [8.1.9](https://github.com/atinc/ngx-tethys/compare/8.1.8...8.1.9) (2020-08-10)


### Features

* **back-top:** add visibility output event #INFR-895 ([76f9321](https://github.com/atinc/ngx-tethys/commit/76f9321)), closes [#INFR-895](https://github.com/atinc/ngx-tethys/issues/INFR-895)



<a name="8.1.8"></a>
## [8.1.8](https://github.com/atinc/ngx-tethys/compare/8.1.7...8.1.8) (2020-08-08)


### Bug Fixes

* **result:** add result test ([9529c71](https://github.com/atinc/ngx-tethys/commit/9529c71))
* **result:** delete it ([a4cdaf6](https://github.com/atinc/ngx-tethys/commit/a4cdaf6))
* **result:** delete wrong title and subtitle ([bb02c1a](https://github.com/atinc/ngx-tethys/commit/bb02c1a))


### Features

* **result:** support custom title and subtitle #INFR-887 ([fa5759e](https://github.com/atinc/ngx-tethys/commit/fa5759e)), closes [#INFR-887](https://github.com/atinc/ngx-tethys/issues/INFR-887)
* **strength:** add strength document #INFR-724 ([#856](https://github.com/atinc/ngx-tethys/issues/856)) ([51a9538](https://github.com/atinc/ngx-tethys/commit/51a9538)), closes [#INFR-724](https://github.com/atinc/ngx-tethys/issues/INFR-724) [#INFR-724](https://github.com/atinc/ngx-tethys/issues/INFR-724)
* **tree-select:** add tree select document #INFR-712 ([aacd110](https://github.com/atinc/ngx-tethys/commit/aacd110)), closes [#INFR-712](https://github.com/atinc/ngx-tethys/issues/INFR-712)



<a name="8.1.7"></a>
## [8.1.7](https://github.com/atinc/ngx-tethys/compare/8.1.6...8.1.7) (2020-08-07)


### Features

* **list:** add list document and fix date-range functional #INFR-743 ([#843](https://github.com/atinc/ngx-tethys/issues/843)) ([0a03195](https://github.com/atinc/ngx-tethys/commit/0a03195)), closes [#INFR-743](https://github.com/atinc/ngx-tethys/issues/INFR-743)



<a name="8.1.6"></a>
## [8.1.6](https://github.com/atinc/ngx-tethys/compare/8.1.5...8.1.6) (2020-08-06)


### Bug Fixes

* **grid:** optimize Tree data display style ([#841](https://github.com/atinc/ngx-tethys/issues/841)) ([0d28eb1](https://github.com/atinc/ngx-tethys/commit/0d28eb1))



<a name="8.1.5"></a>
## [8.1.5](https://github.com/atinc/ngx-tethys/compare/8.1.4...8.1.5) (2020-08-05)


### Bug Fixes

* **date-range:** remove BrowserAnimationsModule imports and fix test #INFR-865 ([#837](https://github.com/atinc/ngx-tethys/issues/837)) ([8b80bf6](https://github.com/atinc/ngx-tethys/commit/8b80bf6)), closes [#INFR-865](https://github.com/atinc/ngx-tethys/issues/INFR-865)
* **grid:** optimize tree expand icon style ([ee89b24](https://github.com/atinc/ngx-tethys/commit/ee89b24))
* fix scss variables name ([ea6844d](https://github.com/atinc/ngx-tethys/commit/ea6844d))
* **anchor:** fix anchor style #INFR-855 ([75433d4](https://github.com/atinc/ngx-tethys/commit/75433d4)), closes [#INFR-855](https://github.com/atinc/ngx-tethys/issues/INFR-855)


### Features

* **select:** add select docs #INFR-711 ([3467740](https://github.com/atinc/ngx-tethys/commit/3467740)), closes [#INFR-711](https://github.com/atinc/ngx-tethys/issues/INFR-711)
* **util:** correct coerceBooleanProperty logic ([#836](https://github.com/atinc/ngx-tethys/issues/836)) ([dbea768](https://github.com/atinc/ngx-tethys/commit/dbea768))
* **util:** correct coerceBooleanProperty logic #INFR-857 ([9dd2b20](https://github.com/atinc/ngx-tethys/commit/9dd2b20)), closes [#INFR-857](https://github.com/atinc/ngx-tethys/issues/INFR-857)



<a name="8.1.4"></a>
## [8.1.4](https://github.com/atinc/ngx-tethys/compare/8.1.3...8.1.4) (2020-07-31)


### Bug Fixes

* **menu:** change wtf to thy-icon in menu docs ([04974da](https://github.com/atinc/ngx-tethys/commit/04974da))
* **nav:** 修复thirdly 三级导航换肤后样式问题(#INFR-849) ([c5e6691](https://github.com/atinc/ngx-tethys/commit/c5e6691)), closes [#INFR-849](https://github.com/atinc/ngx-tethys/issues/INFR-849)
* **property-operation:** add active style #THB-1398 ([#815](https://github.com/atinc/ngx-tethys/issues/815)) ([f168809](https://github.com/atinc/ngx-tethys/commit/f168809)), closes [#THB-1398](https://github.com/atinc/ngx-tethys/issues/THB-1398) [#THB-1398](https://github.com/atinc/ngx-tethys/issues/THB-1398) [#THB-1398](https://github.com/atinc/ngx-tethys/issues/THB-1398)


### Features

* **card:** add card #INFR-741 ([a287c68](https://github.com/atinc/ngx-tethys/commit/a287c68)), closes [#INFR-741](https://github.com/atinc/ngx-tethys/issues/INFR-741)
* **radio:** add radio doc #INFR-650 ([#819](https://github.com/atinc/ngx-tethys/issues/819)) ([3fc5674](https://github.com/atinc/ngx-tethys/commit/3fc5674)), closes [#INFR-650](https://github.com/atinc/ngx-tethys/issues/INFR-650)



<a name="8.1.3"></a>
## [8.1.3](https://github.com/atinc/ngx-tethys/compare/8.1.2...8.1.3) (2020-07-30)


### Bug Fixes

* **back-top:** export back-top component ([#820](https://github.com/atinc/ngx-tethys/issues/820)) ([81579d5](https://github.com/atinc/ngx-tethys/commit/81579d5))



<a name="8.1.2"></a>
## [8.1.2](https://github.com/atinc/ngx-tethys/compare/8.1.0...8.1.2) (2020-07-30)


### Bug Fixes

* **anchor:** modify transition time and call handleActive before animation #INFR-816 ([a4fd90f](https://github.com/atinc/ngx-tethys/commit/a4fd90f)), closes [#INFR-816](https://github.com/atinc/ngx-tethys/issues/INFR-816)
* **grid:** add grid examples #INFR-740 ([b27e799](https://github.com/atinc/ngx-tethys/commit/b27e799)), closes [#INFR-740](https://github.com/atinc/ngx-tethys/issues/INFR-740)
* **grid:** repair file import exception and judgment optimization ([ab6a0bc](https://github.com/atinc/ngx-tethys/commit/ab6a0bc))
* **pagination:** fix basic css error ([#811](https://github.com/atinc/ngx-tethys/issues/811)) ([039a367](https://github.com/atinc/ngx-tethys/commit/039a367))
* prepare upgrade ng 9.x, remove BrowserAnimationsModule in component module #INFR-762 ([e0051c2](https://github.com/atinc/ngx-tethys/commit/e0051c2)), closes [#INFR-762](https://github.com/atinc/ngx-tethys/issues/INFR-762)


### Features

* **anchor:** replace ball style with full #INFR-781 ([#790](https://github.com/atinc/ngx-tethys/issues/790)) ([8499b0e](https://github.com/atinc/ngx-tethys/commit/8499b0e)), closes [#INFR-781](https://github.com/atinc/ngx-tethys/issues/INFR-781)
* **date-range:** modify date-range and add test and new doc ([#803](https://github.com/atinc/ngx-tethys/issues/803)) ([4caa382](https://github.com/atinc/ngx-tethys/commit/4caa382))
* **dropdown:** add dropdown doc #INFR-705 ([#810](https://github.com/atinc/ngx-tethys/issues/810)) ([7e55079](https://github.com/atinc/ngx-tethys/commit/7e55079)), closes [#INFR-705](https://github.com/atinc/ngx-tethys/issues/INFR-705) [#INFR-705](https://github.com/atinc/ngx-tethys/issues/INFR-705)
* **grid:** add grid model type ([95faa7b](https://github.com/atinc/ngx-tethys/commit/95faa7b))
* **grid:** increase tree type data display ([4d205ca](https://github.com/atinc/ngx-tethys/commit/4d205ca))
* **grid:** modify parameters and add test files ([2f5741c](https://github.com/atinc/ngx-tethys/commit/2f5741c))
* #INFR-729 add notify doc ([#788](https://github.com/atinc/ngx-tethys/issues/788)) ([998f671](https://github.com/atinc/ngx-tethys/commit/998f671)), closes [#INFR-729](https://github.com/atinc/ngx-tethys/issues/INFR-729)
* #INFR-815 back top worktile design ([04573a6](https://github.com/atinc/ngx-tethys/commit/04573a6)), closes [#INFR-815](https://github.com/atinc/ngx-tethys/issues/INFR-815)



<a name="8.1.0"></a>
# [8.1.0](https://github.com/atinc/ngx-tethys/compare/8.0.8...8.1.0) (2020-07-08)


### Bug Fixes

* **property-operation:** fix property disabled can click#INFR-790 ([99545e0](https://github.com/atinc/ngx-tethys/commit/99545e0)), closes [click#INFR-790](https://github.com/click/issues/INFR-790)


### Features

* #INFR-759 backTop ([f5e54d5](https://github.com/atinc/ngx-tethys/commit/f5e54d5)), closes [#INFR-759](https://github.com/atinc/ngx-tethys/issues/INFR-759)
* **alert:** #INFR-653 add alert document ([8937460](https://github.com/atinc/ngx-tethys/commit/8937460)), closes [#INFR-653](https://github.com/atinc/ngx-tethys/issues/INFR-653)
* **anchor:** fix build error ([5db1322](https://github.com/atinc/ngx-tethys/commit/5db1322))
* **anchor:** init anchor link affix #INFR-760 ([00f8588](https://github.com/atinc/ngx-tethys/commit/00f8588)), closes [#INFR-760](https://github.com/atinc/ngx-tethys/issues/INFR-760)



<a name="8.0.8"></a>
## [8.0.8](https://github.com/atinc/ngx-tethys/compare/8.0.7...8.0.8) (2020-07-06)


### Features

* **checkbox:** checkbox radio disabled style ([#777](https://github.com/atinc/ngx-tethys/issues/777)) ([f86cb90](https://github.com/atinc/ngx-tethys/commit/f86cb90))



<a name="8.0.7"></a>
## [8.0.7](https://github.com/atinc/ngx-tethys/compare/8.0.6...8.0.7) (2020-07-02)


### Bug Fixes

* **grid:** change build group ([bc95d2d](https://github.com/atinc/ngx-tethys/commit/bc95d2d))
* **grid:** fix test error ([b9f270e](https://github.com/atinc/ngx-tethys/commit/b9f270e))


### Features

* **grid:** add group in grid #INFR-744 ([5ffe22f](https://github.com/atinc/ngx-tethys/commit/5ffe22f)), closes [#INFR-744](https://github.com/atinc/ngx-tethys/issues/INFR-744)
* **grid:** add next docs for grid #INFR-740 ([7249a55](https://github.com/atinc/ngx-tethys/commit/7249a55)), closes [#INFR-740](https://github.com/atinc/ngx-tethys/issues/INFR-740)
* **grid:** add thyGroups in grid ([84cc2f5](https://github.com/atinc/ngx-tethys/commit/84cc2f5))
* **tree:** add public function getTreeNode ([48526a0](https://github.com/atinc/ngx-tethys/commit/48526a0))
* **tree:** support set check state resolve ([d5f6a7c](https://github.com/atinc/ngx-tethys/commit/d5f6a7c))



<a name="8.0.6"></a>
## [8.0.6](https://github.com/atinc/ngx-tethys/compare/8.0.5...8.0.6) (2020-06-29)


### Features

* **breadcrumb:** support breadcrumb example#INFR-704 ([229cd4b](https://github.com/atinc/ngx-tethys/commit/229cd4b)), closes [example#INFR-704](https://github.com/example/issues/INFR-704)



<a name="8.0.5"></a>
## [8.0.5](https://github.com/atinc/ngx-tethys/compare/8.0.4...8.0.5) (2020-06-29)


### Bug Fixes

* **dialog:** remove spaces in dialog header ([4d03da6](https://github.com/atinc/ngx-tethys/commit/4d03da6))
* **form:** fix scss build error Top-level selectors may not contain the parent selector "&"  #INFR-758 ([a53d8b6](https://github.com/atinc/ngx-tethys/commit/a53d8b6)), closes [#INFR-758](https://github.com/atinc/ngx-tethys/issues/INFR-758)


### Features

* **date-picker:** #INFR-690 date-picker disabled ([#752](https://github.com/atinc/ngx-tethys/issues/752)) ([07c3e2a](https://github.com/atinc/ngx-tethys/commit/07c3e2a)), closes [#INFR-690](https://github.com/atinc/ngx-tethys/issues/INFR-690) [#INFR-690](https://github.com/atinc/ngx-tethys/issues/INFR-690)
* **progress:** add progress example#INFR-725 ([028a1d9](https://github.com/atinc/ngx-tethys/commit/028a1d9)), closes [example#INFR-725](https://github.com/example/issues/INFR-725)



<a name="8.0.4"></a>
## [8.0.4](https://github.com/atinc/ngx-tethys/compare/8.0.3...8.0.4) (2020-06-20)


### Features

* **action-menu:** support direction on thyActionMenuSubItem directive #INFR-314 ([7f78032](https://github.com/atinc/ngx-tethys/commit/7f78032)), closes [#INFR-314](https://github.com/atinc/ngx-tethys/issues/INFR-314)



<a name="8.0.3"></a>
## [8.0.3](https://github.com/atinc/ngx-tethys/compare/8.0.2...8.0.3) (2020-06-13)



<a name="8.0.2"></a>
## [8.0.2](https://github.com/atinc/ngx-tethys/compare/8.0.1...8.0.2) (2020-06-12)


### Bug Fixes

* **property-operation:** have mouse when set disabled ([4d2971c](https://github.com/atinc/ngx-tethys/commit/4d2971c))



<a name="8.0.1"></a>
## [8.0.1](https://github.com/atinc/ngx-tethys/compare/8.0.0...8.0.1) (2020-06-10)


### Bug Fixes

* **dropdown:** split use new style#INFR-563 ([e3758ca](https://github.com/atinc/ngx-tethys/commit/e3758ca)), closes [style#INFR-563](https://github.com/style/issues/INFR-563)
* **raster:** fix incorrect util import #INFR-608 ([#738](https://github.com/atinc/ngx-tethys/issues/738)) ([22cd137](https://github.com/atinc/ngx-tethys/commit/22cd137)), closes [#INFR-608](https://github.com/atinc/ngx-tethys/issues/INFR-608)
* **statistic:** separate @Input for @ContentChild for upgrade ng9 #INFR-607 ([#739](https://github.com/atinc/ngx-tethys/issues/739)) ([3962f72](https://github.com/atinc/ngx-tethys/commit/3962f72)), closes [#INFR-607](https://github.com/atinc/ngx-tethys/issues/INFR-607)


### Features

* **select:** enter key stopPropagation on custom-select #INFR-530 ([712deb4](https://github.com/atinc/ngx-tethys/commit/712deb4)), closes [#INFR-530](https://github.com/atinc/ngx-tethys/issues/INFR-530)



<a name="8.0.0"></a>
# [8.0.0](https://github.com/atinc/ngx-tethys/compare/8.0.0-alpha.0...8.0.0) (2020-06-09)


### Bug Fixes

* **transfer:** change cursor when dragging ([fc2ff5c](https://github.com/atinc/ngx-tethys/commit/fc2ff5c)), closes [#INFR-569](https://github.com/atinc/ngx-tethys/issues/INFR-569)



<a name="8.0.0-alpha.0"></a>
# [8.0.0-alpha.0](https://github.com/atinc/ngx-tethys/compare/7.8.5...8.0.0-alpha.0) (2020-06-04)


### Features

* bump angular to 8.2.14 ([#725](https://github.com/atinc/ngx-tethys/issues/725)) ([95f832b](https://github.com/atinc/ngx-tethys/commit/95f832b))

upgrade to 8.0.0-alpha.0 need replace "angular-sortablejs": "^1.0.1" to "ngx-sortablejs": "^3.1.4"

## [7.8.5](https://github.com/atinc/ngx-tethys/compare/7.8.4...7.8.5) (2020-06-04)


### Features

* **checkbox:** #INFR-538 checkbox style ([#719](https://github.com/atinc/ngx-tethys/issues/719)) ([91d91cb](https://github.com/atinc/ngx-tethys/commit/91d91cbfd39ecec8710322367d2a6aba83058c6e)), closes [#INFR-538](https://github.com/atinc/ngx-tethys/issues/INFR-538) [#INFR-538](https://github.com/atinc/ngx-tethys/issues/INFR-538)
* **grid:** #INFR-520 grid size and theme style ([#720](https://github.com/atinc/ngx-tethys/issues/720)) ([882945f](https://github.com/atinc/ngx-tethys/commit/882945f94b87537d6489e6739e640bbdd56c221f)), closes [#INFR-520](https://github.com/atinc/ngx-tethys/issues/INFR-520) [#INFR-520](https://github.com/atinc/ngx-tethys/issues/INFR-520)



## [7.8.4](https://github.com/atinc/ngx-tethys/compare/7.8.3...7.8.4) (2020-06-03)


### Bug Fixes

* **button:** fix button icon hover beat and extract variables ([918ad74](https://github.com/atinc/ngx-tethys/commit/918ad7402ca845c74781176230b75ad07e0ab1d4))


### Features

* **date-picker:** support thySuffixIcon ([cbbfb8b](https://github.com/atinc/ngx-tethys/commit/cbbfb8b506fd6b581478db00f86aec724b2cdb59))
* **drag:** update cursor when dragging ([#712](https://github.com/atinc/ngx-tethys/issues/712)) ([e520985](https://github.com/atinc/ngx-tethys/commit/e5209855d1462724c2cffbef318980a83fbcb191))



## [7.8.3](https://github.com/atinc/ngx-tethys/compare/7.8.2...7.8.3) (2020-06-01)


### Bug Fixes

* **button:** remove svg vertical-align for thy-icon vertical center in btn-icon-circle ([dd3df79](https://github.com/atinc/ngx-tethys/commit/dd3df79bd86b0792223c6b7a455b1931b66ab3bf))
* **grid:** add viewportRuler refresh column with ([de27123](https://github.com/atinc/ngx-tethys/commit/de27123e609830fc7d198303a7a27ef19d5d847f))
* **grid:** add viewportRuler refresh column with ([949c953](https://github.com/atinc/ngx-tethys/commit/949c9533f8277f9f65e07b934ff4a91809906e38))
* **icon:** set default $icon-vertical-align as -0.18em #INFR-536 ([9f80f88](https://github.com/atinc/ngx-tethys/commit/9f80f88026ce9e38fb612b484425296edd6d96d7)), closes [#INFR-536](https://github.com/atinc/ngx-tethys/issues/INFR-536)



## [7.8.2](https://github.com/atinc/ngx-tethys/compare/7.8.1...7.8.2) (2020-06-01)


### Bug Fixes

* **nav:** change layout header nav line-height and $icon-vertical-align for icon text vertical center #INFR-536 ([43c5de4](https://github.com/atinc/ngx-tethys/commit/43c5de41ee56d0ffbf6225fbfa8a6c4b0cb5374d)), closes [#INFR-536](https://github.com/atinc/ngx-tethys/issues/INFR-536)



## [7.8.1](https://github.com/atinc/ngx-tethys/compare/7.8.0...7.8.1) (2020-06-01)


### Features

* **styles:** change global line-height from 1.5 to 1.5715 #INFR-536 ([9cdf393](https://github.com/atinc/ngx-tethys/commit/9cdf393493a3a436fc5e55e92c3fb9f0e88dcf49)), closes [#INFR-536](https://github.com/atinc/ngx-tethys/issues/INFR-536)



# [7.8.0](https://github.com/atinc/ngx-tethys/compare/7.7.11...7.8.0) (2020-05-29)


### Features

* **styles:** change global font-family and set input-btn line-height as 1.47 for center vertically #INFR-395 ([0123054](https://github.com/atinc/ngx-tethys/commit/0123054172f0e9b3d94a737f7858c5a3bfac29a0)), closes [#INFR-395](https://github.com/atinc/ngx-tethys/issues/INFR-395)



## [7.7.11](https://github.com/atinc/ngx-tethys/compare/7.7.10...7.7.11) (2020-05-28)


### Bug Fixes

* **grid:** #INFR-521 先修复头部高度不对问题 ([ec62554](https://github.com/atinc/ngx-tethys/commit/ec6255483ee1f471ad2e35b2a407eb87f4b16652)), closes [#INFR-521](https://github.com/atinc/ngx-tethys/issues/INFR-521)
* **select:** fix select-control can not clear search text #INFR-511 ([1228c86](https://github.com/atinc/ngx-tethys/commit/1228c86e617c792c4ef774613f39917cbccaca5f)), closes [#INFR-511](https://github.com/atinc/ngx-tethys/issues/INFR-511)


### Features

* **icon-nav:** show all icon nav when active#INFR-451 ([9be5955](https://github.com/atinc/ngx-tethys/commit/9be5955b9eb86cc9e6c1aeb630fea4b413c4e726)), closes [active#INFR-451](https://github.com/active/issues/INFR-451)



## [7.7.10](https://github.com/atinc/ngx-tethys/compare/7.7.9...7.7.10) (2020-05-15)


### Bug Fixes

* add delay on afterOpend ([#690](https://github.com/atinc/ngx-tethys/issues/690)) ([264f34d](https://github.com/atinc/ngx-tethys/commit/264f34ddcf9a18130e7b29fa524b4bf9654c705f))
* complete test for idKey is undefined null and empty str #INFR-450 ([e08795e](https://github.com/atinc/ngx-tethys/commit/e08795e39f3b00c2fdb9a3cd5585cf3a77d16184)), closes [#INFR-450](https://github.com/atinc/ngx-tethys/issues/INFR-450)


### Features

* **store:** merge default options throw error idKey id empty #INFR-450 ([d6a00f4](https://github.com/atinc/ngx-tethys/commit/d6a00f4ccdb6f18cb17774d0d12a80cfdf729727)), closes [#INFR-450](https://github.com/atinc/ngx-tethys/issues/INFR-450)



## [7.7.9](https://github.com/atinc/ngx-tethys/compare/7.7.8...7.7.9) (2020-05-14)


### Bug Fixes

* #INFR-436 ([#684](https://github.com/atinc/ngx-tethys/issues/684)) ([8a2119c](https://github.com/atinc/ngx-tethys/commit/8a2119cb062207b3ec61c7ddc9d5b96618249551)), closes [#INFR-436](https://github.com/atinc/ngx-tethys/issues/INFR-436)
* **autocomplete:** update delay time(#WIK-1176) ([#687](https://github.com/atinc/ngx-tethys/issues/687)) ([86b091b](https://github.com/atinc/ngx-tethys/commit/86b091b4705badcb0bce0514ad7c9f6214e38bd4)), closes [#WIK-1176](https://github.com/atinc/ngx-tethys/issues/WIK-1176)
* **date-picker:** fix clear date icon style (#POR-1208) ([ba41902](https://github.com/atinc/ngx-tethys/commit/ba419021340cec65facc3d77eaeda56622100a44)), closes [#POR-1208](https://github.com/atinc/ngx-tethys/issues/POR-1208)
* **overlay:** fix overlay not dispose when viewContainerRef destroyed ([#685](https://github.com/atinc/ngx-tethys/issues/685)) ([0f3dbdd](https://github.com/atinc/ngx-tethys/commit/0f3dbdd96360292aa0a35c7501a74d8711feec26))
* **popover:** config width ([#683](https://github.com/atinc/ngx-tethys/issues/683)) ([670aeeb](https://github.com/atinc/ngx-tethys/commit/670aeeb0569e37c13ccc374080611b787693f0d6))


### Features

* **grid:** #INFR-441 add thySize(default | sm) to thy-grid ([3852953](https://github.com/atinc/ngx-tethys/commit/385295341623ec016734e77c65522ec7f2c7ab19)), closes [#INFR-441](https://github.com/atinc/ngx-tethys/issues/INFR-441)
* **thy-alert:** support message is template type#INFR-430 ([a38bdea](https://github.com/atinc/ngx-tethys/commit/a38bdeaff2dae212a9c3e18abcef7f750e6da392)), closes [type#INFR-430](https://github.com/type/issues/INFR-430)



## [7.7.8](https://github.com/atinc/ngx-tethys/compare/7.7.7...7.7.8) (2020-04-30)


### Features

* **core:** add createWarnDeprecation for logger #INFR-399 ([#678](https://github.com/atinc/ngx-tethys/issues/678)) ([9265980](https://github.com/atinc/ngx-tethys/commit/92659802864f2efd9d8606b0172f444ba46d5d84)), closes [#INFR-399](https://github.com/atinc/ngx-tethys/issues/INFR-399)



## [7.7.7](https://github.com/atinc/ngx-tethys/compare/7.7.6...7.7.7) (2020-04-27)


### Bug Fixes

* **date-picker:** fix value empty validate #INFR-388 ([#673](https://github.com/atinc/ngx-tethys/issues/673)) ([2011802](https://github.com/atinc/ngx-tethys/commit/20118022e69d8e7cbd709676edf6c5d7c7af2f0b)), closes [#INFR-388](https://github.com/atinc/ngx-tethys/issues/INFR-388) [#INFR-388](https://github.com/atinc/ngx-tethys/issues/INFR-388)



## [7.7.6](https://github.com/atinc/ngx-tethys/compare/7.7.5...7.7.6) (2020-04-24)


### Bug Fixes

* **radio:** #AE-1777 radio margin bottom ([#668](https://github.com/atinc/ngx-tethys/issues/668)) ([e000624](https://github.com/atinc/ngx-tethys/commit/e000624b8bd9e1dae04a0f72ffd6bd49a72fac20)), closes [#AE-1777](https://github.com/atinc/ngx-tethys/issues/AE-1777) [#AE-1777](https://github.com/atinc/ngx-tethys/issues/AE-1777) [#AE-1777](https://github.com/atinc/ngx-tethys/issues/AE-1777)


### Features

* **avatar:** add nameTransform to avatar service for custom name transform #INFR-350 ([b7e8523](https://github.com/atinc/ngx-tethys/commit/b7e8523729ea93c45f24b0b6d2129d1fe3a226de)), closes [#INFR-350](https://github.com/atinc/ngx-tethys/issues/INFR-350)



## [7.7.5](https://github.com/atinc/ngx-tethys/compare/7.7.4...7.7.5) (2020-04-23)


### Bug Fixes

* **date-picker:** add format string pipe and fix minDate logic ([#663](https://github.com/atinc/ngx-tethys/issues/663)) ([a7b4eb7](https://github.com/atinc/ngx-tethys/commit/a7b4eb7a842db77db8e65c6f3113d94cdcb69f6c))
* **immutable:** return origin value when add [] ([5e2b83e](https://github.com/atinc/ngx-tethys/commit/5e2b83e3051607bdfee4fbd10265320c3e94f349))


### Features

* **list:** add autoActiveFirstItem to hover first ([#661](https://github.com/atinc/ngx-tethys/issues/661)) ([b09ab25](https://github.com/atinc/ngx-tethys/commit/b09ab252a561ebef174b859cc852f3f4fbc434f2))



## [7.7.4](https://github.com/atinc/ngx-tethys/compare/7.7.3...7.7.4) (2020-04-23)


### Bug Fixes

* **tree-select:** modify expand icon color ([#657](https://github.com/atinc/ngx-tethys/issues/657)) ([163565b](https://github.com/atinc/ngx-tethys/commit/163565bf211d4801f0a222dd0a1107b81d2bf29c))



## [7.7.3](https://github.com/atinc/ngx-tethys/compare/7.7.2...7.7.3) (2020-04-21)


### Bug Fixes

* **date-picker:** repair directive does not pass parameters ([#652](https://github.com/atinc/ngx-tethys/issues/652)) ([1e15536](https://github.com/atinc/ngx-tethys/commit/1e155362477cede352480fbd022fb12c8025a586))



## [7.7.2](https://github.com/atinc/ngx-tethys/compare/7.7.1...7.7.2) (2020-04-20)


### Bug Fixes

* **list:** change thySplit to thyDivided ([3533d00](https://github.com/atinc/ngx-tethys/commit/3533d006715f92a09009972ddc3b11d21ec80702))


### Features

* **dialog:** support set footerDivider in global ([#651](https://github.com/atinc/ngx-tethys/issues/651)) ([1119b55](https://github.com/atinc/ngx-tethys/commit/1119b556161f0b1ef32f2f3624c544e915f61096))
* **raster:** supports raster gutter ([3b16b5e](https://github.com/atinc/ngx-tethys/commit/3b16b5ea0043d3bc2554fd1c97b6faabad42f84d))
* modify autocomplete parameters name(#INFR-327) ([#649](https://github.com/atinc/ngx-tethys/issues/649)) ([81a6b7b](https://github.com/atinc/ngx-tethys/commit/81a6b7b9f5b2591c04c312b0a7c49bb7226c0729)), closes [#INFR-327](https://github.com/atinc/ngx-tethys/issues/INFR-327)



## [7.7.1](https://github.com/atinc/ngx-tethys/compare/7.7.0...7.7.1) (2020-04-18)


### Features

* **confirm:** add set algin;use FormGroupFooter ([#646](https://github.com/atinc/ngx-tethys/issues/646)) ([253fc67](https://github.com/atinc/ngx-tethys/commit/253fc67ff98d8e7f4f6b3721f1e7854cba8441e0))
* **date-picker:** support default picker value ([#642](https://github.com/atinc/ngx-tethys/issues/642)) ([7790a7d](https://github.com/atinc/ngx-tethys/commit/7790a7d1343b9ac38da77ece0b83db2056d932bf))


### Reverts

* **util:** revert tiny date method about compare ([#643](https://github.com/atinc/ngx-tethys/issues/643)) ([412fd98](https://github.com/atinc/ngx-tethys/commit/412fd98a5f664973ff5f5d10874bbfd3eba5b005))



# [7.7.0](https://github.com/atinc/ngx-tethys/compare/7.6.45...7.7.0) (2020-04-17)


### Bug Fixes

* **date-picker:** the date does not match the week #THB-587 ([58d45a4](https://github.com/atinc/ngx-tethys/commit/58d45a43fa16d847dc35a18ff825d565fff5257b)), closes [#THB-587](https://github.com/atinc/ngx-tethys/issues/THB-587)
* **pagination:** range param type ([20491e7](https://github.com/atinc/ngx-tethys/commit/20491e7a4b0ce26eb2282f067cfc6a26c66d875e))
* **property-operation:**  disabled event when  set disabled is true ([3a2b75c](https://github.com/atinc/ngx-tethys/commit/3a2b75c5c2afb5a1a1379d6c5f012c77bc0536e9))
* **slide:** set slide height when container change ([ff58979](https://github.com/atinc/ngx-tethys/commit/ff58979d7d87d91a1446437d1d9e17d40059504d)), closes [#INFR-282](https://github.com/atinc/ngx-tethys/issues/INFR-282)
* **thy-list:** change thyBordered to thySplit ([#639](https://github.com/atinc/ngx-tethys/issues/639)) ([a2f23dd](https://github.com/atinc/ngx-tethys/commit/a2f23ddceefdea0da50552fbdf0f955ea106cad8))
* **thy-list:** perfect demo and add test ([5cddf7c](https://github.com/atinc/ngx-tethys/commit/5cddf7cfbae88b1128648d5c6c2ae36cc8eaf283))


### Features

* **confirm:** set confirm button on the right ([#628](https://github.com/atinc/ngx-tethys/issues/628)) ([4d4a0eb](https://github.com/atinc/ngx-tethys/commit/4d4a0eb22ab3e317c8be225676112bcbe854911f))
* **dialog-footer:** add actionsAlign ([#637](https://github.com/atinc/ngx-tethys/issues/637)) ([94bf16b](https://github.com/atinc/ngx-tethys/commit/94bf16bb8c8d22d46023b0fe043a8913cabc2e11))
* **form:** #INFR-268 form new demo ([c2670ba](https://github.com/atinc/ngx-tethys/commit/c2670ba32db6b19117f402449b3a08013e9ce15f)), closes [#INFR-268](https://github.com/atinc/ngx-tethys/issues/INFR-268)
* **form-group:** #INFR-270 label required display position ([#632](https://github.com/atinc/ngx-tethys/issues/632)) ([2a61671](https://github.com/atinc/ngx-tethys/commit/2a61671e53a542b3f55d4f76efd3ebd4b40098bc)), closes [#INFR-270](https://github.com/atinc/ngx-tethys/issues/INFR-270)
* **form-group-footer:** add setting actions align ([#635](https://github.com/atinc/ngx-tethys/issues/635)) ([60094b4](https://github.com/atinc/ngx-tethys/commit/60094b425ccfe7c9f68e45e94e2e3e47706b1053))
* **grid:** add pagination total and test ([#626](https://github.com/atinc/ngx-tethys/issues/626)) ([7626785](https://github.com/atinc/ngx-tethys/commit/762678560eba42988f7c74175f1f2bb24ef80d8c))
* **list:** add thy-list-item-beta ([02184e7](https://github.com/atinc/ngx-tethys/commit/02184e7e229caee02b1e137d686b4d162e14b30a))
* **pagination:** thy-pagination add total and test ([#620](https://github.com/atinc/ngx-tethys/issues/620)) ([d8babe2](https://github.com/atinc/ngx-tethys/commit/d8babe21c7ea4ec1cf38ce34d686aa03cd4967b8))
* **raster:** add raster, first commit ([#638](https://github.com/atinc/ngx-tethys/issues/638)) ([0918c6e](https://github.com/atinc/ngx-tethys/commit/0918c6e088af175c6af614e147ab1a5e08bb8384))
* **tree-select:** replace expand icon ([#623](https://github.com/atinc/ngx-tethys/issues/623)) ([2cf874a](https://github.com/atinc/ngx-tethys/commit/2cf874ad6005fba5e52dec52e40c6237d376696c))
* #INFR-268 global form layout config ([#625](https://github.com/atinc/ngx-tethys/issues/625)) ([d4b33c8](https://github.com/atinc/ngx-tethys/commit/d4b33c8a90776b4446bd39df9c7ce55ab97c3def)), closes [#INFR-268](https://github.com/atinc/ngx-tethys/issues/INFR-268) [#INFR-268](https://github.com/atinc/ngx-tethys/issues/INFR-268)



## [7.6.45](https://github.com/atinc/ngx-tethys/compare/7.6.44...7.6.45) (2020-04-13)



## [7.6.44](https://github.com/atinc/ngx-tethys/compare/7.6.43...7.6.44) (2020-04-11)


### Bug Fixes

* **tree:** origin tree data add checked prop ([2ec7fe1](https://github.com/atinc/ngx-tethys/commit/2ec7fe127872738c83b3d452c4d4a66ea605df32))


### Features

* **slide:** set slide width by config.width ([#605](https://github.com/atinc/ngx-tethys/issues/605)) ([cedf4f5](https://github.com/atinc/ngx-tethys/commit/cedf4f5caf2e15851d4ded2bd50a96896fa949c9)), closes [#INFR-236](https://github.com/atinc/ngx-tethys/issues/INFR-236)



## [7.6.43](https://github.com/atinc/ngx-tethys/compare/7.6.42...7.6.43) (2020-04-11)


### Bug Fixes

* **slide:** fix slide offset ([#611](https://github.com/atinc/ngx-tethys/issues/611)) ([d62b3c3](https://github.com/atinc/ngx-tethys/commit/d62b3c3980068473368205e82e0c6786a9314d19))
* modify group name font size(#INFR-262) ([4b1b1c1](https://github.com/atinc/ngx-tethys/commit/4b1b1c1aa29e9c4a641b492971fe5cf615cffc71)), closes [#INFR-262](https://github.com/atinc/ngx-tethys/issues/INFR-262)


### Features

* **grid:** add table-sm height ([#609](https://github.com/atinc/ngx-tethys/issues/609)) ([b840987](https://github.com/atinc/ngx-tethys/commit/b8409872ea031f0b6bd8a95a4688eb6d6b774eb6))



## [7.6.42](https://github.com/atinc/ngx-tethys/compare/7.6.41...7.6.42) (2020-04-09)


### Bug Fixes

* fix DOCUMENT import error ([#604](https://github.com/atinc/ngx-tethys/issues/604)) ([e1cdfb5](https://github.com/atinc/ngx-tethys/commit/e1cdfb5db71aaee961eebd76574b7ac58754d654))


### Features

* **slide:** support mode='push'/'side'/'over' #INFR-183 ([9d16543](https://github.com/atinc/ngx-tethys/commit/9d165435384353ef8ef25c3e9f7efa897f32b994)), closes [#INFR-183](https://github.com/atinc/ngx-tethys/issues/INFR-183)


### BREAKING CHANGES

* **slide:** configure THY_SLIDE_DEFAULT_CONFIG contain drawerContainer globally



## [7.6.41](https://github.com/atinc/ngx-tethys/compare/7.6.40...7.6.41) (2020-04-08)


### Bug Fixes

* **autocomplete:** fix can not detect change when onpush ([93cf9ca](https://github.com/atinc/ngx-tethys/commit/93cf9cae5752f536b03e54c6b281800545dcaa46))


### Features

* **action-menu:** automation hidden first and last divider ([#596](https://github.com/atinc/ngx-tethys/issues/596)) ([b51257e](https://github.com/atinc/ngx-tethys/commit/b51257e9917effbfc47a790a6011e47a22cb388c))
* **autocomplete:** add autocomplete component ([#600](https://github.com/atinc/ngx-tethys/issues/600)) ([c1a3a6c](https://github.com/atinc/ngx-tethys/commit/c1a3a6cbbb39a0ae4071fd706943e87e18f66e17))
* **grid:** table-sm td height initial ([#599](https://github.com/atinc/ngx-tethys/issues/599)) ([6f920c4](https://github.com/atinc/ngx-tethys/commit/6f920c4113f273e187e929a4bc4ed57a171f9e49))



## [7.6.40](https://github.com/atinc/ngx-tethys/compare/7.6.39...7.6.40) (2020-04-02)


### Bug Fixes

* #INF-526 恢复修改badge-section ([0470bc7](https://github.com/atinc/ngx-tethys/commit/0470bc7284221d1f4ea9cfd9f49183b14e88b9c5)), closes [#INF-526](https://github.com/atinc/ngx-tethys/issues/INF-526)
* #INF-526 恢复修改badge-section ([1e9e274](https://github.com/atinc/ngx-tethys/commit/1e9e274cf6497b9d17e398b288ce1935aaacafef)), closes [#INF-526](https://github.com/atinc/ngx-tethys/issues/INF-526)
* **tree:** fix expand status when tree nodes changed #INFR-189 ([26634fd](https://github.com/atinc/ngx-tethys/commit/26634fd44052e9593ced81280eed684838df8fe4)), closes [#INFR-189](https://github.com/atinc/ngx-tethys/issues/INFR-189)
* **tree:** sync last selecteds when data changed ([ccb5fbf](https://github.com/atinc/ngx-tethys/commit/ccb5fbf2b1d706f3152b8edc23155af934f9df6b))


### Features

* **date-picker:** ngModel support number and add directive validate ([2525d58](https://github.com/atinc/ngx-tethys/commit/2525d58ffff5b0abad5611b9593c2a9c6ce9073a))
* #INF-526 add badge test and use docs ([3cd6c0b](https://github.com/atinc/ngx-tethys/commit/3cd6c0b3d9633526861089860d586ce6306ccb9e)), closes [#INF-526](https://github.com/atinc/ngx-tethys/issues/INF-526)
* #INF-526 add badge use docs ([22df3fd](https://github.com/atinc/ngx-tethys/commit/22df3fd3c759f032eb5cca4b5e3523f5ad4f163f)), closes [#INF-526](https://github.com/atinc/ngx-tethys/issues/INF-526)
* **tree:** tree node support disabled class ([#586](https://github.com/atinc/ngx-tethys/issues/586)) ([92db08b](https://github.com/atinc/ngx-tethys/commit/92db08b2a79a99fc41750efa7196f25d3176573c))



## [7.6.39](https://github.com/atinc/ngx-tethys/compare/7.6.38...7.6.39) (2020-03-28)


### Bug Fixes

* **progress:** fix progress bar style when value is 0 ([537063e](https://github.com/atinc/ngx-tethys/commit/537063e25033e39f6721a608cff4c862a8e95be8))



## [7.6.38](https://github.com/atinc/ngx-tethys/compare/7.6.37...7.6.38) (2020-03-25)


### Reverts

* Revert " support fold breadcrumb item #INF-419 (#561)" (#575) ([1c84129](https://github.com/atinc/ngx-tethys/commit/1c8412916893c3c2acb45bdeb69ef26280085125)), closes [#INF-419](https://github.com/atinc/ngx-tethys/issues/INF-419) [#561](https://github.com/atinc/ngx-tethys/issues/561) [#575](https://github.com/atinc/ngx-tethys/issues/575)



## [7.6.37](https://github.com/atinc/ngx-tethys/compare/7.6.36...7.6.37) (2020-03-24)


### Bug Fixes

* **overlay:** add clearTimer in overlay directive ([#570](https://github.com/atinc/ngx-tethys/issues/570)) ([bb00e96](https://github.com/atinc/ngx-tethys/commit/bb00e960d2ffee2310053787827ab6c9e500b98c))
* **popover:** fix popover close error ([4e97c74](https://github.com/atinc/ngx-tethys/commit/4e97c741d2a95e9e73bdfe3f82bedffb12616116))


### Features

* **util:** tiny date add fromUnixTime and compare method #INF-529 ([8bff975](https://github.com/atinc/ngx-tethys/commit/8bff975e6b89490bc0c4460791059a8b6d73c4f6)), closes [#INF-529](https://github.com/atinc/ngx-tethys/issues/INF-529)



## [7.6.36](https://github.com/atinc/ngx-tethys/compare/7.6.35...7.6.36) (2020-03-19)


### Bug Fixes

* **popover:** add showTimeoutId and hideTimeoutId in base overlay ([#564](https://github.com/atinc/ngx-tethys/issues/564)) ([86fc5c9](https://github.com/atinc/ngx-tethys/commit/86fc5c9ff4fe1e8680468b5ca96e78e6b340940b))



## [7.6.35](https://github.com/atinc/ngx-tethys/compare/7.6.34...7.6.35) (2020-03-17)


### Bug Fixes

* **statistic:** set title and suffix font-size to 14px ([834e06d](https://github.com/atinc/ngx-tethys/commit/834e06da2b8d34479d87d1d086740a10f77b6add))
* **statistic:** set title and suffix font-size to 14px #INF-516 ([a81fe22](https://github.com/atinc/ngx-tethys/commit/a81fe22efbe2f1974fa32f802e5ecf501432e23f)), closes [#INF-516](https://github.com/atinc/ngx-tethys/issues/INF-516)
* **tree-select:** set expand icon line-height:1 ([d12ba08](https://github.com/atinc/ngx-tethys/commit/d12ba0886fc9be5a51ff728611deee368091a282))


### Features

* **popover:** add thyShowDelay in popover directive #INF-511 ([#560](https://github.com/atinc/ngx-tethys/issues/560)) ([ecc0f65](https://github.com/atinc/ngx-tethys/commit/ecc0f656ea6c04669ab93a8e699a354d5f15e1c1)), closes [#INF-511](https://github.com/atinc/ngx-tethys/issues/INF-511)



## [7.6.34](https://github.com/atinc/ngx-tethys/compare/7.6.33...7.6.34) (2020-03-14)


### Bug Fixes

* **popover:** add thyConfig in popover ([a22897d](https://github.com/atinc/ngx-tethys/commit/a22897de87ded82e01ff1cca5af67a12fb51ff6a))
* **popover:** fix ThyPopoverConfig import error ([e29c7e3](https://github.com/atinc/ngx-tethys/commit/e29c7e3ca82453c550992eebcdf4a4e06d0bf148))
* **statistic:** set statistic number font-family ([#550](https://github.com/atinc/ngx-tethys/issues/550)) ([1207489](https://github.com/atinc/ngx-tethys/commit/120748973bf2ec79dd2b56fee6fca6e237e0d77a))



## [7.6.33](https://github.com/atinc/ngx-tethys/compare/7.6.32...7.6.33) (2020-03-12)


### Bug Fixes

* **nav:** nav-thirdly should always have no border-bottom #INF-497 ([#547](https://github.com/atinc/ngx-tethys/issues/547)) ([8c7e73c](https://github.com/atinc/ngx-tethys/commit/8c7e73cdf9e8ae2452557c152b2f8d51e2876327)), closes [#INF-497](https://github.com/atinc/ngx-tethys/issues/INF-497)



## [7.6.32](https://github.com/atinc/ngx-tethys/compare/7.6.31...7.6.32) (2020-03-09)


### Bug Fixes

* **copy:** change demo url ([f2a7e59](https://github.com/atinc/ngx-tethys/commit/f2a7e59c2dcf0af2867915ea4006a7f5da3c5a64))
* **nav:** set border width avoid to bounce when hover or active #INF-478 ([587c9c7](https://github.com/atinc/ngx-tethys/commit/587c9c7f76e72c9813bc589f71c079cf1752250a)), closes [#INF-478](https://github.com/atinc/ngx-tethys/issues/INF-478) [#INF-478](https://github.com/atinc/ngx-tethys/issues/INF-478) [#INF-478](https://github.com/atinc/ngx-tethys/issues/INF-478)
* **statistic:** parametertype name add component name ([9786401](https://github.com/atinc/ngx-tethys/commit/9786401459e8bfa9d8ff59913571142c4a58c861))
* **statistic:** show value when value is 0 ([0faeb63](https://github.com/atinc/ngx-tethys/commit/0faeb63054dc9065c7d483504a20c5592ed6824d))
* **time-picker:** fix thy-time-picker style ([#538](https://github.com/atinc/ngx-tethys/issues/538)) ([61cafaa](https://github.com/atinc/ngx-tethys/commit/61cafaaca18bc12be94057ef6aace1d2cc338b17))
* **tree:** fix tree border height when thyType is sm ([#542](https://github.com/atinc/ngx-tethys/issues/542)) ([b9f4a88](https://github.com/atinc/ngx-tethys/commit/b9f4a88cbe9953b6dec81a2a9f27e706f89dd5f2))
* **vote:** parametertype name add component name ([930c841](https://github.com/atinc/ngx-tethys/commit/930c841980fe2f3aabcc0bfdb3951f81173dbaa8))


### Features

* **statistic:** support thyTitlePosition to set titlt position ([#539](https://github.com/atinc/ngx-tethys/issues/539)) ([e8d9502](https://github.com/atinc/ngx-tethys/commit/e8d9502e1381a51a833a5b571aa51a200cb4284f))



## [7.6.31](https://github.com/atinc/ngx-tethys/compare/7.6.30...7.6.31) (2020-02-28)


### Bug Fixes

* revert thy-content style ([9c3995f](https://github.com/atinc/ngx-tethys/commit/9c3995f0f8e3efa6b3d8f6be9cd1dbe1bd9525ff))
* **thy-menu:** keep active style when hover occurs ([3f7d21c](https://github.com/atinc/ngx-tethys/commit/3f7d21cbeccd35f7cdc23e1f1f04bcde7b9ddfb3))
* **tootip:** hide after touch ([188e1ed](https://github.com/atinc/ngx-tethys/commit/188e1edee7b7ec1df0012bfe268cc30b256f8df2))


### Features

* **thy-icon-nav:** #INF-448 thyType 支持无间隔 ([6a8a7f3](https://github.com/atinc/ngx-tethys/commit/6a8a7f302bb5352bd17aaead3849c0b07cb37c54)), closes [#INF-448](https://github.com/atinc/ngx-tethys/issues/INF-448)
* **thy-popover:** support outside closable(#INF-457) ([ea204d3](https://github.com/atinc/ngx-tethys/commit/ea204d3abae115c39df16e51b93fa56f5b03618d)), closes [#INF-457](https://github.com/atinc/ngx-tethys/issues/INF-457)



## [7.6.30](https://github.com/atinc/ngx-tethys/compare/7.6.29...7.6.30) (2020-02-26)


### Bug Fixes

* **thy-header:** operation middle and content overflow hidden(#INF-440) ([9e51fe0](https://github.com/atinc/ngx-tethys/commit/9e51fe0c546c01ae0b65267b76f5b01662bd21f4)), closes [#INF-440](https://github.com/atinc/ngx-tethys/issues/INF-440)


### Features

* **core:** add logger contains warn and warnDeprecation ([4db84a8](https://github.com/atinc/ngx-tethys/commit/4db84a82483be1b3fcfc9923f7e8bdda4df8fcb9))
* **thy-statistic:** add thy-statistic component ([#521](https://github.com/atinc/ngx-tethys/issues/521)) ([f53f3f0](https://github.com/atinc/ngx-tethys/commit/f53f3f0b782c7d790e42638d1dd8e99ab8d46f8d))
* **transfer:** support render content ref #PLN-154#INF-416#INF-388# ([#525](https://github.com/atinc/ngx-tethys/issues/525)) ([aa1f8d8](https://github.com/atinc/ngx-tethys/commit/aa1f8d8f1d46e93bc68c0405f88e394d5c98992e)), closes [#PLN-154](https://github.com/atinc/ngx-tethys/issues/PLN-154) [#INF-416](https://github.com/atinc/ngx-tethys/issues/INF-416) [#INF-388](https://github.com/atinc/ngx-tethys/issues/INF-388) [#PLN-154](https://github.com/atinc/ngx-tethys/issues/PLN-154) [#INF-416](https://github.com/atinc/ngx-tethys/issues/INF-416) [#INF-388](https://github.com/atinc/ngx-tethys/issues/INF-388)



<a name="7.6.29"></a>

## [7.6.29](https://github.com/atinc/ngx-tethys/compare/v7.6.24...v7.6.29) (2020-02-11)


### Bug Fixes

* fix select can not auto close when multiple select(#INF-300) ([7487e1f](https://github.com/atinc/ngx-tethys/commit/7487e1f)), closes [#INF-300](https://github.com/atinc/ngx-tethys/issues/INF-300)
* **button:** fix >ng8 use ngx-tethys build [@extend](https://github.com/extend) .x.x error #INF-390 ([eccc944](https://github.com/atinc/ngx-tethys/commit/eccc944)), closes [#INF-390](https://github.com/atinc/ngx-tethys/issues/INF-390)
* **button:** icon-danger-weak include btn-link-variant mixin ([#517](https://github.com/atinc/ngx-tethys/issues/517)) ([14e95d7](https://github.com/atinc/ngx-tethys/commit/14e95d7))
* **mention:** fix instert value in next line bug ([9056844](https://github.com/atinc/ngx-tethys/commit/9056844))
* **mention:** fix popover position when data changed ([0651d3d](https://github.com/atinc/ngx-tethys/commit/0651d3d))
* **popover:** fix DOCUMENT import error ([#496](https://github.com/atinc/ngx-tethys/issues/496)) ([1e15f6c](https://github.com/atinc/ngx-tethys/commit/1e15f6c))
* **tree-select:** remove min height  #AE-849 ([8539c41](https://github.com/atinc/ngx-tethys/commit/8539c41)), closes [#AE-849](https://github.com/atinc/ngx-tethys/issues/AE-849)
* **uitl:** set entities default value when entities is undefinde ([#509](https://github.com/atinc/ngx-tethys/issues/509)) ([9d230bc](https://github.com/atinc/ngx-tethys/commit/9d230bc))


### Features

* **date-picker:** add thyDatePicker module (#INF-125) ([b11df46](https://github.com/atinc/ngx-tethys/commit/b11df46)), closes [#INF-125](https://github.com/atinc/ngx-tethys/issues/INF-125)
* **mention:** mention support anto close ([9632c32](https://github.com/atinc/ngx-tethys/commit/9632c32))
* **time-picker:** add thyTimePickerModule #INF-332 ([#512](https://github.com/atinc/ngx-tethys/issues/512)) ([c639e19](https://github.com/atinc/ngx-tethys/commit/c639e19)), closes [#INF-332](https://github.com/atinc/ngx-tethys/issues/INF-332) [#INF-332](https://github.com/atinc/ngx-tethys/issues/INF-332)
* **tree-select:** support set icon type #AE-626 ([b86fd9c](https://github.com/atinc/ngx-tethys/commit/b86fd9c)), closes [#AE-626](https://github.com/atinc/ngx-tethys/issues/AE-626)



## [7.6.28](https://github.com/atinc/ngx-tethys/compare/7.6.24...7.6.28) (2020-02-10)


### Bug Fixes

* **button:** fix >ng8 use ngx-tethys build [@extend](https://github.com/extend) .x.x error #INF-390 ([eccc944](https://github.com/atinc/ngx-tethys/commit/eccc944)), closes [#INF-390](https://github.com/atinc/ngx-tethys/issues/INF-390)
* **mention:** fix instert value in next line bug ([9056844](https://github.com/atinc/ngx-tethys/commit/9056844))
* **mention:** fix popover position when data changed ([0651d3d](https://github.com/atinc/ngx-tethys/commit/0651d3d))
* **popover:** fix DOCUMENT import error ([#496](https://github.com/atinc/ngx-tethys/issues/496)) ([1e15f6c](https://github.com/atinc/ngx-tethys/commit/1e15f6c))
* **tree-select:** remove min height  #AE-849 ([8539c41](https://github.com/atinc/ngx-tethys/commit/8539c41)), closes [#AE-849](https://github.com/atinc/ngx-tethys/issues/AE-849)
* **uitl:** set entities default value when entities is undefinde ([#509](https://github.com/atinc/ngx-tethys/issues/509)) ([9d230bc](https://github.com/atinc/ngx-tethys/commit/9d230bc))
* fix select can not auto close when multiple select(#INF-300) ([7487e1f](https://github.com/atinc/ngx-tethys/commit/7487e1f)), closes [#INF-300](https://github.com/atinc/ngx-tethys/issues/INF-300)


### Features

* **date-picker:** add thyDatePicker module (#INF-125) ([b11df46](https://github.com/atinc/ngx-tethys/commit/b11df46)), closes [#INF-125](https://github.com/atinc/ngx-tethys/issues/INF-125)
* **mention:** mention support anto close ([9632c32](https://github.com/atinc/ngx-tethys/commit/9632c32))
* **time-picker:** add thyTimePickerModule #INF-332 ([#512](https://github.com/atinc/ngx-tethys/issues/512)) ([c639e19](https://github.com/atinc/ngx-tethys/commit/c639e19)), closes [#INF-332](https://github.com/atinc/ngx-tethys/issues/INF-332) [#INF-332](https://github.com/atinc/ngx-tethys/issues/INF-332)
* **tree-select:** support set icon type #AE-626 ([b86fd9c](https://github.com/atinc/ngx-tethys/commit/b86fd9c)), closes [#AE-626](https://github.com/atinc/ngx-tethys/issues/AE-626)



## [7.6.27](https://github.com/atinc/ngx-tethys/compare/7.6.24...7.6.27) (2020-02-07)


### Bug Fixes

* fix select can not auto close when multiple select(#INF-300) ([7487e1f](https://github.com/atinc/ngx-tethys/commit/7487e1f)), closes [#INF-300](https://github.com/atinc/ngx-tethys/issues/INF-300)
* **mention:** fix instert value in next line bug ([9056844](https://github.com/atinc/ngx-tethys/commit/9056844))
* **mention:** fix popover position when data changed ([0651d3d](https://github.com/atinc/ngx-tethys/commit/0651d3d))
* **popover:** fix DOCUMENT import error ([#496](https://github.com/atinc/ngx-tethys/issues/496)) ([1e15f6c](https://github.com/atinc/ngx-tethys/commit/1e15f6c))
* **tree-select:** remove min height  #AE-849 ([8539c41](https://github.com/atinc/ngx-tethys/commit/8539c41)), closes [#AE-849](https://github.com/atinc/ngx-tethys/issues/AE-849)


### Features

* **date-picker:** add thyDatePicker module (#INF-125) ([b11df46](https://github.com/atinc/ngx-tethys/commit/b11df46)), closes [#INF-125](https://github.com/atinc/ngx-tethys/issues/INF-125)
* **mention:** mention support anto close ([9632c32](https://github.com/atinc/ngx-tethys/commit/9632c32))



## [7.6.26](https://github.com/atinc/ngx-tethys/compare/7.6.24...7.6.26) (2020-01-16)


### Bug Fixes

* fix select can not auto close when multiple select(#INF-300) ([7487e1f](https://github.com/atinc/ngx-tethys/commit/7487e1f)), closes [#INF-300](https://github.com/atinc/ngx-tethys/issues/INF-300)
* **mention:** fix instert value in next line bug ([9056844](https://github.com/atinc/ngx-tethys/commit/9056844))
* **mention:** fix popover position when data changed ([0651d3d](https://github.com/atinc/ngx-tethys/commit/0651d3d))
* **popover:** fix DOCUMENT import error ([#496](https://github.com/atinc/ngx-tethys/issues/496)) ([1e15f6c](https://github.com/atinc/ngx-tethys/commit/1e15f6c))


### Features

* **mention:** mention support anto close ([9632c32](https://github.com/atinc/ngx-tethys/commit/9632c32))



## [7.6.25](https://github.com/atinc/ngx-tethys/compare/7.6.24...7.6.25) (2020-01-13)


### Bug Fixes

* fix select can not auto close when multiple select(#INF-300) ([7487e1f](https://github.com/atinc/ngx-tethys/commit/7487e1f)), closes [#INF-300](https://github.com/atinc/ngx-tethys/issues/INF-300)
* **popover:** fix DOCUMENT import error ([ad2c6c0](https://github.com/atinc/ngx-tethys/commit/ad2c6c0))



## [7.6.24](https://github.com/atinc/ngx-tethys/compare/7.6.23...7.6.24) (2020-01-13)


### Bug Fixes

* **vote:** vote background opacity to 0.1 ([#492](https://github.com/atinc/ngx-tethys/issues/492)) ([aa7375e](https://github.com/atinc/ngx-tethys/commit/aa7375e))


### Features

* **popover:** popover use new  FlexibleConnectedPositionStrategy ([cacc7a3](https://github.com/atinc/ngx-tethys/commit/cacc7a3))



## [7.6.23](https://github.com/atinc/ngx-tethys/compare/7.6.22...7.6.23) (2020-01-10)


### Bug Fixes

* **list:** replace icon ([#489](https://github.com/atinc/ngx-tethys/issues/489)) ([af14511](https://github.com/atinc/ngx-tethys/commit/af14511))


### Features

* **mention:** position self-adapte #INF-280 ([#490](https://github.com/atinc/ngx-tethys/issues/490)) ([9475b7d](https://github.com/atinc/ngx-tethys/commit/9475b7d)), closes [#INF-280](https://github.com/atinc/ngx-tethys/issues/INF-280)



## [7.6.22](https://github.com/atinc/ngx-tethys/compare/7.6.21...7.6.22) (2020-01-06)


### Features

* **mention:**  support popover class and select event ([0c4cf41](https://github.com/atinc/ngx-tethys/commit/0c4cf41))
* **mention:** support popover class and select event ([#487](https://github.com/atinc/ngx-tethys/issues/487)) ([e236b2c](https://github.com/atinc/ngx-tethys/commit/e236b2c))



## [7.6.21](https://github.com/atinc/ngx-tethys/compare/7.6.20...7.6.21) (2020-01-03)


### Bug Fixes

* export copy ([#484](https://github.com/atinc/ngx-tethys/issues/484)) ([6a3659a](https://github.com/atinc/ngx-tethys/commit/6a3659a))


### Features

* **mention:** add mention first ([#481](https://github.com/atinc/ngx-tethys/issues/481)) ([534c05c](https://github.com/atinc/ngx-tethys/commit/534c05c))
* **mention:** support remote search ([#485](https://github.com/atinc/ngx-tethys/issues/485)) ([3e2cba1](https://github.com/atinc/ngx-tethys/commit/3e2cba1))
* **vote:** support img vote ([#482](https://github.com/atinc/ngx-tethys/issues/482)) ([c0093f6](https://github.com/atinc/ngx-tethys/commit/c0093f6))



## [7.6.20](https://github.com/atinc/ngx-tethys/compare/7.6.19...7.6.20) (2019-12-30)



## [7.6.19](https://github.com/atinc/ngx-tethys/compare/7.6.17...7.6.19) (2019-12-27)


### Bug Fixes

* **button-icon:** button icon color test ([#476](https://github.com/atinc/ngx-tethys/issues/476)) ([c6cc1be](https://github.com/atinc/ngx-tethys/commit/c6cc1be))
* **button-icon:** support color ([#472](https://github.com/atinc/ngx-tethys/issues/472)) ([d226bcd](https://github.com/atinc/ngx-tethys/commit/d226bcd))
* **list:** modify key of defaultActive, add test ([c9c99a2](https://github.com/atinc/ngx-tethys/commit/c9c99a2))
* **vote:** add weak to thytype ([#474](https://github.com/atinc/ngx-tethys/issues/474)) ([2ceb18e](https://github.com/atinc/ngx-tethys/commit/2ceb18e))
* **vote:** support weak ([#470](https://github.com/atinc/ngx-tethys/issues/470)) ([2c7c471](https://github.com/atinc/ngx-tethys/commit/2c7c471))


### Features

* **list:** add thyDefaultHover to hover first ([8c2cd34](https://github.com/atinc/ngx-tethys/commit/8c2cd34))
* **list:** add thyDefaultHover to hover first ([#466](https://github.com/atinc/ngx-tethys/issues/466)) ([230ebdf](https://github.com/atinc/ngx-tethys/commit/230ebdf))



## [7.6.18](https://github.com/atinc/ngx-tethys/compare/7.6.17...7.6.18) (2019-12-27)


### Bug Fixes

* **button-icon:** support color ([#472](https://github.com/atinc/ngx-tethys/issues/472)) ([d226bcd](https://github.com/atinc/ngx-tethys/commit/d226bcd))
* **vote:** support weak ([#470](https://github.com/atinc/ngx-tethys/issues/470)) ([2c7c471](https://github.com/atinc/ngx-tethys/commit/2c7c471))


### Features

* **list:** add thyDefaultHover to hover first ([#466](https://github.com/atinc/ngx-tethys/issues/466)) ([230ebdf](https://github.com/atinc/ngx-tethys/commit/230ebdf))



## [7.6.17](https://github.com/atinc/ngx-tethys/compare/7.6.14...7.6.17) (2019-12-25)


### Bug Fixes

* **checkbox:** change checkbox demo ([#463](https://github.com/atinc/ngx-tethys/issues/463)) ([ad576aa](https://github.com/atinc/ngx-tethys/commit/ad576aa))
* **checkbox:** change checkbox transition ([#465](https://github.com/atinc/ngx-tethys/issues/465)) ([30d3e09](https://github.com/atinc/ngx-tethys/commit/30d3e09))
* **grid:** fix grid set selections error when unselect ([0c18db3](https://github.com/atinc/ngx-tethys/commit/0c18db3))
* **layout:** fix can't scroll to bottom in chrom 79.0.x #INF-262 ([c70e380](https://github.com/atinc/ngx-tethys/commit/c70e380)), closes [#INF-262](https://github.com/atinc/ngx-tethys/issues/INF-262)
* **list:** change grid list option styles ([e0e6d33](https://github.com/atinc/ngx-tethys/commit/e0e6d33))
* **stepper:** change step header line style ([23f58ac](https://github.com/atinc/ngx-tethys/commit/23f58ac))
* **stepper:** change step line color #CMN-810 ([176ae72](https://github.com/atinc/ngx-tethys/commit/176ae72)), closes [#CMN-810](https://github.com/atinc/ngx-tethys/issues/CMN-810)
* **tree:** fix check state error ([bd3cfa6](https://github.com/atinc/ngx-tethys/commit/bd3cfa6))
* **tree:** fix set default key error when node is null ([88a1435](https://github.com/atinc/ngx-tethys/commit/88a1435))


### Features

* **checbox:** add thyIndeterminate in checkbox #INF-269 ([20daea8](https://github.com/atinc/ngx-tethys/commit/20daea8)), closes [#INF-269](https://github.com/atinc/ngx-tethys/issues/INF-269)
* **tree:** support default selected keys prop ([02a0c03](https://github.com/atinc/ngx-tethys/commit/02a0c03))
* **tree:** support tree node check ([88b2948](https://github.com/atinc/ngx-tethys/commit/88b2948))
* **tree:** support tree node check ([#464](https://github.com/atinc/ngx-tethys/issues/464)) ([3a48a1a](https://github.com/atinc/ngx-tethys/commit/3a48a1a)), closes [#CMN-810](https://github.com/atinc/ngx-tethys/issues/CMN-810)
* **vote:** add vote component #INF-169 ([#458](https://github.com/atinc/ngx-tethys/issues/458)) ([62d77b3](https://github.com/atinc/ngx-tethys/commit/62d77b3)), closes [#INF-169](https://github.com/atinc/ngx-tethys/issues/INF-169) [#INF-169](https://github.com/atinc/ngx-tethys/issues/INF-169)



## [7.6.16](https://github.com/atinc/ngx-tethys/compare/7.6.14...7.6.16) (2019-12-24)


### Bug Fixes

* **layout:** fix can't scroll to bottom in chrom 79.0.x #INF-262 ([c70e380](https://github.com/atinc/ngx-tethys/commit/c70e380)), closes [#INF-262](https://github.com/atinc/ngx-tethys/issues/INF-262)


### Features

* **checbox:** add thyIndeterminate in checkbox #INF-269 ([20daea8](https://github.com/atinc/ngx-tethys/commit/20daea8)), closes [#INF-269](https://github.com/atinc/ngx-tethys/issues/INF-269)
* **vote:** add vote component #INF-169 ([#458](https://github.com/atinc/ngx-tethys/issues/458)) ([62d77b3](https://github.com/atinc/ngx-tethys/commit/62d77b3)), closes [#INF-169](https://github.com/atinc/ngx-tethys/issues/INF-169) [#INF-169](https://github.com/atinc/ngx-tethys/issues/INF-169)



## [7.6.14](https://github.com/atinc/ngx-tethys/compare/7.6.12...7.6.14) (2019-12-16)


### Bug Fixes

* **dialog:** change dialog header title font-weight to 400 #INF-254 ([#453](https://github.com/atinc/ngx-tethys/issues/453)) ([8868a3c](https://github.com/atinc/ngx-tethys/commit/8868a3c)), closes [#INF-254](https://github.com/atinc/ngx-tethys/issues/INF-254) [#INF-254](https://github.com/atinc/ngx-tethys/issues/INF-254) [#INF-254](https://github.com/atinc/ngx-tethys/issues/INF-254)
* **list:** change grid list option styles ([e0e6d33](https://github.com/atinc/ngx-tethys/commit/e0e6d33))
* **markdown:** fix markdown new line#CMN-801 ([#455](https://github.com/atinc/ngx-tethys/issues/455)) ([eacab2d](https://github.com/atinc/ngx-tethys/commit/eacab2d)), closes [line#CMN-801](https://github.com/line/issues/CMN-801)
* **stepper:** change step header line style ([23f58ac](https://github.com/atinc/ngx-tethys/commit/23f58ac))
* default thyCopyText ([adaf5db](https://github.com/atinc/ngx-tethys/commit/adaf5db))
* **stepper:** change step line color #CMN-810 ([176ae72](https://github.com/atinc/ngx-tethys/commit/176ae72)), closes [#CMN-810](https://github.com/atinc/ngx-tethys/issues/CMN-810)
 


### Features

* **result:** add result component ([#451](https://github.com/atinc/ngx-tethys/issues/451)) ([811c2b2](https://github.com/atinc/ngx-tethys/commit/811c2b2))



## [7.6.13](https://github.com/atinc/ngx-tethys/compare/7.6.12...7.6.13) (2019-12-11)


### Bug Fixes

* add thycopy event ThyCopyEvent ([996d3d9](https://github.com/atinc/ngx-tethys/commit/996d3d9))
* add thyCopyNotifyText to show notify ([aecaa65](https://github.com/atinc/ngx-tethys/commit/aecaa65))
* add ThyNotifyService provider ([bcf583f](https://github.com/atinc/ngx-tethys/commit/bcf583f))
* add ThyNotifyService provider ([e26c3bd](https://github.com/atinc/ngx-tethys/commit/e26c3bd))
* copy input() name ([22d428d](https://github.com/atinc/ngx-tethys/commit/22d428d))
* copy menu and input() name ([9b09891](https://github.com/atinc/ngx-tethys/commit/9b09891))
* copy test tick 4500 wait notify ([60aeb26](https://github.com/atinc/ngx-tethys/commit/60aeb26))
* copy test tick 4500 wait notify ([6063788](https://github.com/atinc/ngx-tethys/commit/6063788))
* copy tooltips  click to hover ([107a7dc](https://github.com/atinc/ngx-tethys/commit/107a7dc))
* default thyCopyText ([adaf5db](https://github.com/atinc/ngx-tethys/commit/adaf5db))
* fix test ts ([972185c](https://github.com/atinc/ngx-tethys/commit/972185c))
* remove parameter ([5a15c9f](https://github.com/atinc/ngx-tethys/commit/5a15c9f))
* remove vote ([81ff6db](https://github.com/atinc/ngx-tethys/commit/81ff6db))
* thy-copy test add ThyNotifyModule ([2564d65](https://github.com/atinc/ngx-tethys/commit/2564d65))
* thyCopyNotifyText to thyCopySuccessText ([adce370](https://github.com/atinc/ngx-tethys/commit/adce370))
* **action-menu:** add action menu variables in variables scss ([cf1aebc](https://github.com/atinc/ngx-tethys/commit/cf1aebc))
* **action-menu:** add group api parameters ([71b6b3e](https://github.com/atinc/ngx-tethys/commit/71b6b3e))
* **action-menu:** change styxName to styxTitle ([732059a](https://github.com/atinc/ngx-tethys/commit/732059a))


### Features

* copy ([f3f7ba3](https://github.com/atinc/ngx-tethys/commit/f3f7ba3))
* **action-menu:** add group type and divider type #INF-194 ([57ede21](https://github.com/atinc/ngx-tethys/commit/57ede21)), closes [#INF-194](https://github.com/atinc/ngx-tethys/issues/INF-194)
* **action-menu:** add thy-action-menu-group component ([9232118](https://github.com/atinc/ngx-tethys/commit/9232118))
* **copy:** add ThyCopyDirective ([ecf3c71](https://github.com/atinc/ngx-tethys/commit/ecf3c71))
* **thy-copy:** copy text when click ([e2b26bb](https://github.com/atinc/ngx-tethys/commit/e2b26bb))



## [7.6.12](https://github.com/atinc/ngx-tethys/compare/7.6.10...7.6.12) (2019-11-29)


### Bug Fixes

* **list:** change size varible ([1639836](https://github.com/atinc/ngx-tethys/commit/1639836))


### Features

* **list:** selection-list support thySize ([12e88d2](https://github.com/atinc/ngx-tethys/commit/12e88d2))
* **list:** support list sm size#INF-178 ([01b02a6](https://github.com/atinc/ngx-tethys/commit/01b02a6)), closes [size#INF-178](https://github.com/size/issues/INF-178)



## [7.6.11](https://github.com/atinc/ngx-tethys/compare/7.6.10...7.6.11) (2019-11-28)


### Bug Fixes

* **list:** change size varible ([1639836](https://github.com/atinc/ngx-tethys/commit/1639836))


### Features

* **list:** support list sm size#INF-178 ([01b02a6](https://github.com/atinc/ngx-tethys/commit/01b02a6)), closes [size#INF-178](https://github.com/size/issues/INF-178)



## [7.6.10](https://github.com/atinc/ngx-tethys/compare/7.6.7...7.6.10) (2019-11-28)


### Bug Fixes

* **gride-section:** remove () ([88c8cec](https://github.com/atinc/ngx-tethys/commit/88c8cec))
* **util:** fix util  match dom error when IE ([2972cc9](https://github.com/atinc/ngx-tethys/commit/2972cc9))


### Features

* **alert:** add type, success-week and warning-week and danger-week ([9a8319e](https://github.com/atinc/ngx-tethys/commit/9a8319e))
* **datepicker:** datepicker support default select value ([e0a4a1b](https://github.com/atinc/ngx-tethys/commit/e0a4a1b))
* **grid:** add thyShowHeader to control thread show or hide ([64bea19](https://github.com/atinc/ngx-tethys/commit/64bea19))
* **grid:** add thyShowHeader to control thread show or hide ([bbd1f85](https://github.com/atinc/ngx-tethys/commit/bbd1f85))
* **popover:** popover config add scroll stragety ([1776ed3](https://github.com/atinc/ngx-tethys/commit/1776ed3))



## [7.6.9](https://github.com/atinc/ngx-tethys/compare/7.6.7...7.6.9) (2019-11-20)


### Bug Fixes

* **util:** fix util  match dom error when IE ([2972cc9](https://github.com/atinc/ngx-tethys/commit/2972cc9))


### Features

* **popover:** popover config add scroll stragety ([1776ed3](https://github.com/atinc/ngx-tethys/commit/1776ed3))



## [7.6.8](https://github.com/atinc/ngx-tethys/compare/7.6.7...7.6.8) (2019-11-20)


### Features

* **popover:** popover config add scroll stragety ([1776ed3](https://github.com/atinc/ngx-tethys/commit/1776ed3))



## [7.6.7](https://github.com/atinc/ngx-tethys/compare/7.6.2...7.6.7) (2019-11-15)


### Bug Fixes

* **cascader:** fix clear style ([09e0080](https://github.com/atinc/ngx-tethys/commit/09e0080))
* **markdown:** add thyBypassSecurityTrustHtml without sanitize ([8ffcfa0](https://github.com/atinc/ngx-tethys/commit/8ffcfa0))
* **markdown:** use ng dom sanitizer sanitize html fix xss #CMN-477 ([67eefa3](https://github.com/atinc/ngx-tethys/commit/67eefa3)), closes [#CMN-477](https://github.com/atinc/ngx-tethys/issues/CMN-477)


### Features

* **avatar:** update avatar bg colors ([94ed242](https://github.com/atinc/ngx-tethys/commit/94ed242))
* **icon:** icon support safari ([ebbb53b](https://github.com/atinc/ngx-tethys/commit/ebbb53b))
* **icon:** icon support safari ([4deda76](https://github.com/atinc/ngx-tethys/commit/4deda76))



## [7.6.6](https://github.com/atinc/ngx-tethys/compare/7.6.2...7.6.6) (2019-11-15)


### Bug Fixes

* **cascader:** fix clear style ([09e0080](https://github.com/atinc/ngx-tethys/commit/09e0080))
* **markdown:** use ng dom sanitizer sanitize html fix xss #CMN-477 ([67eefa3](https://github.com/atinc/ngx-tethys/commit/67eefa3)), closes [#CMN-477](https://github.com/atinc/ngx-tethys/issues/CMN-477)


### Features

* **avatar:** update avatar bg colors ([94ed242](https://github.com/atinc/ngx-tethys/commit/94ed242))
* **icon:** icon support safari ([ebbb53b](https://github.com/atinc/ngx-tethys/commit/ebbb53b))
* **icon:** icon support safari ([4deda76](https://github.com/atinc/ngx-tethys/commit/4deda76))




## [7.6.5](https://github.com/atinc/ngx-tethys/compare/7.6.2...7.6.5) (2019-11-15)


### Bug Fixes

* **cascader:** fix clear style ([09e0080](https://github.com/atinc/ngx-tethys/commit/09e0080))
* **markdown:** use ng dom sanitizer sanitize html fix xss #CMN-477 ([67eefa3](https://github.com/atinc/ngx-tethys/commit/67eefa3)), closes [#CMN-477](https://github.com/atinc/ngx-tethys/issues/CMN-477)


### Features

* **avatar:** update avatar bg colors ([94ed242](https://github.com/atinc/ngx-tethys/commit/94ed242))
* **icon:** icon support safari ([ebbb53b](https://github.com/atinc/ngx-tethys/commit/ebbb53b))
* **icon:** icon support safari ([4deda76](https://github.com/atinc/ngx-tethys/commit/4deda76))



## [7.6.4](https://github.com/atinc/ngx-tethys/compare/7.6.2...7.6.4) (2019-11-15)


### Bug Fixes

* **cascader:** fix clear style ([09e0080](https://github.com/atinc/ngx-tethys/commit/09e0080))


### Features

* **avatar:** update avatar bg colors ([94ed242](https://github.com/atinc/ngx-tethys/commit/94ed242))
* **icon:** icon support safari ([ebbb53b](https://github.com/atinc/ngx-tethys/commit/ebbb53b))
* **icon:** icon support safari ([4deda76](https://github.com/atinc/ngx-tethys/commit/4deda76))



## [7.6.3](https://github.com/atinc/ngx-tethys/compare/7.6.2...7.6.3) (2019-11-14)


### Bug Fixes

* **cascader:** fix clear style ([09e0080](https://github.com/atinc/ngx-tethys/commit/09e0080))


### Features

* **icon:** icon support safari ([ebbb53b](https://github.com/atinc/ngx-tethys/commit/ebbb53b))
* **icon:** icon support safari ([4deda76](https://github.com/atinc/ngx-tethys/commit/4deda76))



## [7.6.2](https://github.com/atinc/ngx-tethys/compare/7.6.1...7.6.2) (2019-11-14)


### Features

* **alert:** support closeable & operationTemplate ([65252dc](https://github.com/atinc/ngx-tethys/commit/65252dc))



## [7.6.1](https://github.com/atinc/ngx-tethys/compare/7.6.0...7.6.1) (2019-11-13)


### Bug Fixes

* **custom-select:** fix class name for options ([3ca5d26](https://github.com/atinc/ngx-tethys/commit/3ca5d26))
* **custom-select:** remove checked-icon if ([f3b1040](https://github.com/atinc/ngx-tethys/commit/f3b1040))


### Features

* **alert:** add strong type of danger & secondary ([2b4ba88](https://github.com/atinc/ngx-tethys/commit/2b4ba88))



# [7.6.0](https://github.com/atinc/ngx-tethys/compare/7.5.29...7.6.0) (2019-11-12)


### Bug Fixes

* **custom-select:** fix test case and stop close when muitiple is true ([2fe45a7](https://github.com/atinc/ngx-tethys/commit/2fe45a7))
* **select-control:** fix change newlines when selected item is overflow ([65c33a3](https://github.com/atinc/ngx-tethys/commit/65c33a3))


### Features

* **custom-select:** support clear when panel is open ([4944088](https://github.com/atinc/ngx-tethys/commit/4944088))
* add cdkScrollable for demo ([b1a8f9c](https://github.com/atinc/ngx-tethys/commit/b1a8f9c))
* **skeleton:** add skeleton module contains thy-skeleton comp #INF-124 ([a49d883](https://github.com/atinc/ngx-tethys/commit/a49d883)), closes [#INF-124](https://github.com/atinc/ngx-tethys/issues/INF-124)



## [7.5.29](https://github.com/atinc/ngx-tethys/compare/7.5.27...7.5.29) (2019-11-07)


### Bug Fixes

* **action-menu:** change spacing between icon and text ([0a8e68c](https://github.com/atinc/ngx-tethys/commit/0a8e68c))
* **custom-select:** fix option active and hover conflict ([ed4d8b5](https://github.com/atinc/ngx-tethys/commit/ed4d8b5))
* **list:** update list-item bg to f3f3f3 ([9b1729f](https://github.com/atinc/ngx-tethys/commit/9b1729f))
* **select:** fix option paddingRight from 35 to 20 ([fa7d1cd](https://github.com/atinc/ngx-tethys/commit/fa7d1cd)), closes [#INF-94](https://github.com/atinc/ngx-tethys/issues/INF-94)
* **tree:** set default tree type ([8d40d02](https://github.com/atinc/ngx-tethys/commit/8d40d02))
* **tree-select:** modify style of single selection ([5694019](https://github.com/atinc/ngx-tethys/commit/5694019))


### Features

* **input:** input default autocomplete off (#INF-133,#AE-140) ([3cdb388](https://github.com/atinc/ngx-tethys/commit/3cdb388)), closes [#INF-133](https://github.com/atinc/ngx-tethys/issues/INF-133) [#AE-140](https://github.com/atinc/ngx-tethys/issues/AE-140)



## [7.5.28](https://github.com/atinc/ngx-tethys/compare/7.5.27...7.5.28) (2019-10-25)


### Bug Fixes

* **action-menu:** change spacing between icon and text ([0a8e68c](https://github.com/atinc/ngx-tethys/commit/0a8e68c))
* **list:** update list-item bg to f3f3f3 ([9b1729f](https://github.com/atinc/ngx-tethys/commit/9b1729f))
* **select:** fix option paddingRight from 35 to 20 ([fa7d1cd](https://github.com/atinc/ngx-tethys/commit/fa7d1cd)), closes [#INF-94](https://github.com/atinc/ngx-tethys/issues/INF-94)



## [7.5.27](https://github.com/atinc/ngx-tethys/compare/7.5.25...7.5.27) (2019-10-17)


### Bug Fixes

* remove left style for selected-value ([c922c6d](https://github.com/atinc/ngx-tethys/commit/c922c6d))
* **input:** add input size variables ([9470a2e](https://github.com/atinc/ngx-tethys/commit/9470a2e))
* delete nested span when show custom option ([d196d2a](https://github.com/atinc/ngx-tethys/commit/d196d2a))



## [7.5.26](https://github.com/atinc/ngx-tethys/compare/7.5.25...7.5.26) (2019-10-14)


### Bug Fixes

* delete nested span when show custom option ([d196d2a](https://github.com/atinc/ngx-tethys/commit/d196d2a))



## [7.5.25](https://github.com/atinc/ngx-tethys/compare/7.5.24...7.5.25) (2019-10-14)


### Bug Fixes

* **card:** change header title color to [#333](https://github.com/atinc/ngx-tethys/issues/333),  fix DOCUMENT error by way ([af7d8c0](https://github.com/atinc/ngx-tethys/commit/af7d8c0))



## [7.5.24](https://github.com/atinc/ngx-tethys/compare/7.5.23...7.5.24) (2019-10-12)


### Bug Fixes

* **card:** change padding-top as 10px when size is sm and divided mode ([e7c17dc](https://github.com/atinc/ngx-tethys/commit/e7c17dc))



## [7.5.23](https://github.com/atinc/ngx-tethys/compare/7.5.22...7.5.23) (2019-10-12)


### Bug Fixes

* **custom-select:** add complex-select demo ([8746026](https://github.com/atinc/ngx-tethys/commit/8746026))
* **custom-select:** add focus border and add interaction select function ([ab744d1](https://github.com/atinc/ngx-tethys/commit/ab744d1))
* **custom-select:** fix error ([bf27eb8](https://github.com/atinc/ngx-tethys/commit/bf27eb8))
* provider ComplexSelectSelectionComponent ([d9f713a](https://github.com/atinc/ngx-tethys/commit/d9f713a))
* **custom-select:** fix test case ([6a348a0](https://github.com/atinc/ngx-tethys/commit/6a348a0))
* **custom-select:** remove clear btn test style ([830f7fb](https://github.com/atinc/ngx-tethys/commit/830f7fb))
* **custom-select:** remove console log ([4891927](https://github.com/atinc/ngx-tethys/commit/4891927))
* **custom-select:** remove text-light for checked-icon ([32899f3](https://github.com/atinc/ngx-tethys/commit/32899f3))
* **option:** update padding-right from 20 to 35 ([28ffc4c](https://github.com/atinc/ngx-tethys/commit/28ffc4c))
* **select-control:** fix disable input when set thyDisabled ([6ae1634](https://github.com/atinc/ngx-tethys/commit/6ae1634))
* **tree-select:** add type for positions ([636a212](https://github.com/atinc/ngx-tethys/commit/636a212))
* **tree-select:** update style class for custom-select ([a594d15](https://github.com/atinc/ngx-tethys/commit/a594d15))


### Features

* **card:** add divided mode, header has border, padding increas [#265857](https://github.com/atinc/ngx-tethys/issues/265857) ([86862a5](https://github.com/atinc/ngx-tethys/commit/86862a5))
* **custom-select:** add custom-select-top-control and support search ([fc0c63c](https://github.com/atinc/ngx-tethys/commit/fc0c63c))
* **custom-select:** add empty status component for search ([c632286](https://github.com/atinc/ngx-tethys/commit/c632286))
* **custom-select:** apply withWrap in KeyManager(#[#265594](https://github.com/atinc/ngx-tethys/issues/265594)) ([19db2d2](https://github.com/atinc/ngx-tethys/commit/19db2d2))
* **custom-select:** support shortcut operation ([62f344f](https://github.com/atinc/ngx-tethys/commit/62f344f))
* **custom-select:** support thySortComparator sort selectionmodel ([332c46b](https://github.com/atinc/ngx-tethys/commit/332c46b))
* **select-control:** add thySize param and add test case ([4f2de96](https://github.com/atinc/ngx-tethys/commit/4f2de96))
* **select-control:** support backspace remove selected option ([c4599cd](https://github.com/atinc/ngx-tethys/commit/c4599cd))
* **select-control:** support thySize ([8369206](https://github.com/atinc/ngx-tethys/commit/8369206))



## [7.5.22](https://github.com/atinc/ngx-tethys/compare/7.5.21...7.5.22) (2019-10-11)


### Bug Fixes

* **action-menu:** add action menu item test [#266822](https://github.com/atinc/ngx-tethys/issues/266822) ([398c017](https://github.com/atinc/ngx-tethys/commit/398c017))
* fix tree-title 'g' letter be covered ([113292a](https://github.com/atinc/ngx-tethys/commit/113292a))
* **action-menu:** place icon in the middle of the action menu item ([9d782b2](https://github.com/atinc/ngx-tethys/commit/9d782b2))
* **popover:** add condition for add activeClass ([c200138](https://github.com/atinc/ngx-tethys/commit/c200138))


### Features

* **action-menu:** add thytype in action menu item [#266822](https://github.com/atinc/ngx-tethys/issues/266822) ([7414f42](https://github.com/atinc/ngx-tethys/commit/7414f42))
* #[#266961](https://github.com/atinc/ngx-tethys/issues/266961) ngx-tethys】添加link-muted,颜色为[#888](https://github.com/atinc/ngx-tethys/issues/888) ([23ae350](https://github.com/atinc/ngx-tethys/commit/23ae350))
* **breadcrumb:** chang icon and text color [#267177](https://github.com/atinc/ngx-tethys/issues/267177) ([65c1457](https://github.com/atinc/ngx-tethys/commit/65c1457)), closes [#888](https://github.com/atinc/ngx-tethys/issues/888)



## [7.5.21](https://github.com/atinc/ngx-tethys/compare/7.5.20...7.5.21) (2019-10-08)


### Bug Fixes

* **badge:** change danger badge color [#265706](https://github.com/atinc/ngx-tethys/issues/265706) ([6dd3244](https://github.com/atinc/ngx-tethys/commit/6dd3244))
* **entity-store:** fix trackBy 'this' error ([49d3080](https://github.com/atinc/ngx-tethys/commit/49d3080))
* **slide:** add pill style for close [#266712](https://github.com/atinc/ngx-tethys/issues/266712) ([37c4fe3](https://github.com/atinc/ngx-tethys/commit/37c4fe3))


### Features

* **badage:** supports text backgroud color custome, and alone use agile ([d1f2743](https://github.com/atinc/ngx-tethys/commit/d1f2743))
* **badage:** supports text backgroud color custome, and alone use agile ([7814417](https://github.com/atinc/ngx-tethys/commit/7814417))
* **badage:** supports text backgroud color custome, and alone use agile ([741751d](https://github.com/atinc/ngx-tethys/commit/741751d))
* **link:** add link-warning and link-warning-weak [#265951](https://github.com/atinc/ngx-tethys/issues/265951) ([dc233d7](https://github.com/atinc/ngx-tethys/commit/dc233d7))
* **switch:** add $switch-margin-bottom to switch ([b3f3018](https://github.com/atinc/ngx-tethys/commit/b3f3018)), closes [#265585](https://github.com/atinc/ngx-tethys/issues/265585)



## [7.5.20](https://github.com/atinc/ngx-tethys/compare/7.5.19...7.5.20) (2019-09-23)



## [7.5.19](https://github.com/atinc/ngx-tethys/compare/7.5.17...7.5.19) (2019-09-23)


### Bug Fixes

* fix custom-select active style and fix tree icon and text align ([9a719a6](https://github.com/atinc/ngx-tethys/commit/9a719a6))
* **list:** not call toggleOption() [#265188](https://github.com/atinc/ngx-tethys/issues/265188) ([9fd2009](https://github.com/atinc/ngx-tethys/commit/9fd2009))
* **nav:** icon should vertical center in item link ([59914a0](https://github.com/atinc/ngx-tethys/commit/59914a0))
* **pagination:**  style fix ([7325178](https://github.com/atinc/ngx-tethys/commit/7325178))
* **popover:** fix toState==enter in start animate ([5a9e689](https://github.com/atinc/ngx-tethys/commit/5a9e689))
* **slide:** modify by review ([3721979](https://github.com/atinc/ngx-tethys/commit/3721979))


### Features

* **slide:** add .active to trigger,add animation ([615cd05](https://github.com/atinc/ngx-tethys/commit/615cd05))
* **tree:** support customer expand icon [#264984](https://github.com/atinc/ngx-tethys/issues/264984) ([7975898](https://github.com/atinc/ngx-tethys/commit/7975898))



## [7.5.18](https://github.com/atinc/ngx-tethys/compare/7.5.17...7.5.18) (2019-09-23)


### Bug Fixes

* fix custom-select active style and fix tree icon and text align ([9a719a6](https://github.com/atinc/ngx-tethys/commit/9a719a6))
* **list:** not call toggleOption() [#265188](https://github.com/atinc/ngx-tethys/issues/265188) ([9fd2009](https://github.com/atinc/ngx-tethys/commit/9fd2009))
* **nav:** icon should vertical center in item link ([59914a0](https://github.com/atinc/ngx-tethys/commit/59914a0))
* **pagination:**  style fix ([7325178](https://github.com/atinc/ngx-tethys/commit/7325178))
* **popover:** fix toState==enter in start animate ([5a9e689](https://github.com/atinc/ngx-tethys/commit/5a9e689))
* **slide:** modify by review ([3721979](https://github.com/atinc/ngx-tethys/commit/3721979))


### Features

* **slide:** add .active to trigger,add animation ([615cd05](https://github.com/atinc/ngx-tethys/commit/615cd05))
* **tree:** support customer expand icon [#264984](https://github.com/atinc/ngx-tethys/issues/264984) ([7975898](https://github.com/atinc/ngx-tethys/commit/7975898))



## [7.5.17](https://github.com/atinc/ngx-tethys/compare/7.5.16...7.5.17) (2019-09-12)


### Bug Fixes

* **popover:** fix popover can not auto close when insideClosable is true ([16b78fa](https://github.com/atinc/ngx-tethys/commit/16b78fa))



## [7.5.16](https://github.com/atinc/ngx-tethys/compare/7.5.15...7.5.16) (2019-09-11)


### Features

* **dialog:** add thySize for header, add pill style for close [#264303](https://github.com/atinc/ngx-tethys/issues/264303) ([e6a4856](https://github.com/atinc/ngx-tethys/commit/e6a4856))



## [7.5.15](https://github.com/atinc/ngx-tethys/compare/7.5.14...7.5.15) (2019-09-11)


### Bug Fixes

* fix button shake when change button is disabled ([28b2d11](https://github.com/atinc/ngx-tethys/commit/28b2d11))
* **other:** solve the effect of style on layout ([51f154d](https://github.com/atinc/ngx-tethys/commit/51f154d))
* **overlat-directive:** remove implements OnDescroty ([d553109](https://github.com/atinc/ngx-tethys/commit/d553109))
* **popover:** should close when click origin again manualClosure as true ([e5b890c](https://github.com/atinc/ngx-tethys/commit/e5b890c))


### Features

* **core:** add upper overlay contains service, ref, config, container ([24794ac](https://github.com/atinc/ngx-tethys/commit/24794ac))
* **popover:** popover support manualClosure ([0909b7b](https://github.com/atinc/ngx-tethys/commit/0909b7b))
* **popover:** popover support manualClosure ([5ba7b56](https://github.com/atinc/ngx-tethys/commit/5ba7b56))
* **popover:** popover support manualClosure ([8f036dd](https://github.com/atinc/ngx-tethys/commit/8f036dd))
* **popover:** popover support multiple ([aa5ce9c](https://github.com/atinc/ngx-tethys/commit/aa5ce9c))
* **slide:** slide section divider border ui input switch ([bb0357a](https://github.com/atinc/ngx-tethys/commit/bb0357a))
* **slide:** slide section divider border ui input switch ([14f3da1](https://github.com/atinc/ngx-tethys/commit/14f3da1))
* **slide:** slide section divider border ui input switch ([ee73560](https://github.com/atinc/ngx-tethys/commit/ee73560))
* **slide:** slide section divider border ui input switch ([eedced0](https://github.com/atinc/ngx-tethys/commit/eedced0))



## [7.5.14](https://github.com/atinc/ngx-tethys/compare/7.5.13...7.5.14) (2019-08-29)


### Bug Fixes

* **property-operation:** del theme cursor pointer ([341180c](https://github.com/atinc/ngx-tethys/commit/341180c))
* fix button shake when change button is disabled ([74775ad](https://github.com/atinc/ngx-tethys/commit/74775ad))
* **entity-store:** incorrect error message ([7512d0a](https://github.com/atinc/ngx-tethys/commit/7512d0a))
* **entity-store:** remove pageIndex and add clearPagination [#261249](https://github.com/atinc/ngx-tethys/issues/261249) ([fd689ca](https://github.com/atinc/ngx-tethys/commit/fd689ca))
* **property-operation:** change doc ([837f338](https://github.com/atinc/ngx-tethys/commit/837f338))
* **property-operation:** del cursor pointer ([83f30e8](https://github.com/atinc/ngx-tethys/commit/83f30e8))
* fix button shake when change button is disabled ([e2dadc9](https://github.com/atinc/ngx-tethys/commit/e2dadc9))
* fix tree drag drop bug ([600e047](https://github.com/atinc/ngx-tethys/commit/600e047))


### Features

* **property-operation:** feat thyDisabled and thyClick[#261473](https://github.com/atinc/ngx-tethys/issues/261473) ([c6eb973](https://github.com/atinc/ngx-tethys/commit/c6eb973))



## [7.5.13](https://github.com/atinc/ngx-tethys/compare/7.5.12...7.5.13) (2019-08-27)


### Bug Fixes

* **entity-store:** should remove by id when idKey is custom ([0985408](https://github.com/atinc/ngx-tethys/commit/0985408))



## [7.5.12](https://github.com/atinc/ngx-tethys/compare/7.5.11...7.5.12) (2019-08-27)


### Bug Fixes

* **dialog:** [#000](https://github.com/atinc/ngx-tethys/issues/000) dialog add eunm full/remove export referenes ([66eb78f](https://github.com/atinc/ngx-tethys/commit/66eb78f))



## [7.5.11](https://github.com/atinc/ngx-tethys/compare/7.5.10...7.5.11) (2019-08-26)


### Bug Fixes

* **other:** add demo-title ([8fc9ea8](https://github.com/atinc/ngx-tethys/commit/8fc9ea8))
* **other:** adjust layout ([1a9d09e](https://github.com/atinc/ngx-tethys/commit/1a9d09e))
* **other:** demo layout adjustment ([1e2f606](https://github.com/atinc/ngx-tethys/commit/1e2f606))
* **other:** remove log ([63ca549](https://github.com/atinc/ngx-tethys/commit/63ca549))
* **other:** style adjustment ([eb36950](https://github.com/atinc/ngx-tethys/commit/eb36950))


### Features

* **avatar:** add a disabled style ([cd71b6c](https://github.com/atinc/ngx-tethys/commit/cd71b6c))
* **store:** add references support for entity store [#260560](https://github.com/atinc/ngx-tethys/issues/260560) ([fea2e70](https://github.com/atinc/ngx-tethys/commit/fea2e70))
* **utils:** add merge and build references dictionary methods [#260560](https://github.com/atinc/ngx-tethys/issues/260560) ([fc8afa2](https://github.com/atinc/ngx-tethys/commit/fc8afa2))
* **utils:** add merge and build references dictionary methods [#260560](https://github.com/atinc/ngx-tethys/issues/260560) ([eb1e12f](https://github.com/atinc/ngx-tethys/commit/eb1e12f))



## [7.5.10](https://github.com/atinc/ngx-tethys/compare/7.5.9...7.5.10) (2019-08-20)


### Bug Fixes

* **form:** prevent submit when element has 'contenteditable' attribute ([e6be89e](https://github.com/atinc/ngx-tethys/commit/e6be89e))
* fix tree drag drop bug ([d8b9898](https://github.com/atinc/ngx-tethys/commit/d8b9898))


### Features

* **icon-nav:** add thyIconNavLinkIcon param and add test cases [#259926](https://github.com/atinc/ngx-tethys/issues/259926) ([4489b2d](https://github.com/atinc/ngx-tethys/commit/4489b2d))
* **layout:** add isolated for sidebar, width support lg 300px [#260322](https://github.com/atinc/ngx-tethys/issues/260322) ([ab843a8](https://github.com/atinc/ngx-tethys/commit/ab843a8))



## [7.5.9](https://github.com/atinc/ngx-tethys/compare/7.5.8...7.5.9) (2019-08-16)


### Bug Fixes

* **option-item:** change prefix icon color use in tree select ([8bcb595](https://github.com/atinc/ngx-tethys/commit/8bcb595))
* **popover:** replace ComponentType from core/src render3 to cdk/portal ([ffc6acf](https://github.com/atinc/ngx-tethys/commit/ffc6acf))
* **store:** should get immutable entities when curd entities [#259936](https://github.com/atinc/ngx-tethys/issues/259936) ([bd48c89](https://github.com/atinc/ngx-tethys/commit/bd48c89))


### Features

* **nav:** add icon nav component for icon actions nav [#259926](https://github.com/atinc/ngx-tethys/issues/259926) ([a841efa](https://github.com/atinc/ngx-tethys/commit/a841efa))



## [7.5.8](https://github.com/atinc/ngx-tethys/compare/7.5.6...7.5.8) (2019-08-15)


### Bug Fixes

* **checkbox:** checkout disabled style ([50aa75c](https://github.com/atinc/ngx-tethys/commit/50aa75c))
* **core:** change option hover bg color and refactor theme [#259681](https://github.com/atinc/ngx-tethys/issues/259681) ([3186f4d](https://github.com/atinc/ngx-tethys/commit/3186f4d))
* **input:** checkout and radio theme ([30bb44c](https://github.com/atinc/ngx-tethys/commit/30bb44c))
* **menu:** menu active color and hover background color ([60d69c5](https://github.com/atinc/ngx-tethys/commit/60d69c5))
* **menu:** menu active color and hover background color ([c8daec6](https://github.com/atinc/ngx-tethys/commit/c8daec6))
* **popover:** remove min-height ([332f761](https://github.com/atinc/ngx-tethys/commit/332f761))
* **slide:** change slide body section padding ([6576ebc](https://github.com/atinc/ngx-tethys/commit/6576ebc))
* **transfer:** fix dragDrop when list is empty ([7a931f5](https://github.com/atinc/ngx-tethys/commit/7a931f5))
* **tree:** fix drag drop position error ([1f5a87a](https://github.com/atinc/ngx-tethys/commit/1f5a87a))


### Features

* **notify:** add notify border ([365d4af](https://github.com/atinc/ngx-tethys/commit/365d4af))
* **table:** remove tr hover space for table ([11a5db1](https://github.com/atinc/ngx-tethys/commit/11a5db1))
* **tree:** new drag and drop(break-change: remove thyOnDraggableChange) ([591b4b7](https://github.com/atinc/ngx-tethys/commit/591b4b7))



## <small>7.5.7 (2019-08-14)</small>

* chore: change demo ([ed72304](https://github.com/atinc/ngx-tethys/commit/ed72304))
* feat(tree): new drag and drop(break-change: remove thyOnDraggableChange) ([591b4b7](https://github.com/atinc/ngx-tethys/commit/591b4b7))
* fix(input): checkout and radio theme ([30bb44c](https://github.com/atinc/ngx-tethys/commit/30bb44c))
* fix(slide): change slide body section padding ([6576ebc](https://github.com/atinc/ngx-tethys/commit/6576ebc))



## <small>7.5.6 (2019-08-14)</small>

* fix: fix drag and dorp errors ([4bc83e5](https://github.com/atinc/ngx-tethys/commit/4bc83e5))
* fix: fix import error ([f5758fe](https://github.com/atinc/ngx-tethys/commit/f5758fe))
* fix: hover color cheage to $gray-100 ([2d77d76](https://github.com/atinc/ngx-tethys/commit/2d77d76))
* fix(grid): #252531 fix sort style ([9a4640f](https://github.com/atinc/ngx-tethys/commit/9a4640f))
* fix(input):  remove useless variables input-search-padding-y ([e537e19](https://github.com/atinc/ngx-tethys/commit/e537e19))
* fix(input): input search default height modification (#257733) ([31cd699](https://github.com/atinc/ngx-tethys/commit/31cd699)), closes [#257733](https://github.com/atinc/ngx-tethys/issues/257733)
* fix(menu): menu hover change to background $gray-80 ([5904ebf](https://github.com/atinc/ngx-tethys/commit/5904ebf))
* fix(notify): change expression ([7eecb22](https://github.com/atinc/ngx-tethys/commit/7eecb22))
* fix(notify): fix hide notify content ([25902e9](https://github.com/atinc/ngx-tethys/commit/25902e9))
* fix(pagination): #257573 thy-page-link ([620e802](https://github.com/atinc/ngx-tethys/commit/620e802)), closes [#257573](https://github.com/atinc/ngx-tethys/issues/257573)
* fix(property-operation): fix hover icon style and change demo  #256410 ([22c0ead](https://github.com/atinc/ngx-tethys/commit/22c0ead)), closes [#256410](https://github.com/atinc/ngx-tethys/issues/256410)
* fix(select): select remove button position adjustment(#257534) ([057cd11](https://github.com/atinc/ngx-tethys/commit/057cd11)), closes [#257534](https://github.com/atinc/ngx-tethys/issues/257534)
* fix(slide): stop propagation when close slide ([8b79505](https://github.com/atinc/ngx-tethys/commit/8b79505))
* fix(transfer): fix repeated value when assign data ([36c68fb](https://github.com/atinc/ngx-tethys/commit/36c68fb))
* fix(tree): fix covert tree node bug when key is empty string ([0cf1164](https://github.com/atinc/ngx-tethys/commit/0cf1164))
* chore(notify): recover notify example ([6b62e6c](https://github.com/atinc/ngx-tethys/commit/6b62e6c))
* chore(release): upgrade to 7.5.5 ([0275f55](https://github.com/atinc/ngx-tethys/commit/0275f55))
* feat(drag-drop): add drag and drop directives ([38eed2c](https://github.com/atinc/ngx-tethys/commit/38eed2c))
* feat(grid): #254209 click favorite display ([1380463](https://github.com/atinc/ngx-tethys/commit/1380463)), closes [#254209](https://github.com/atinc/ngx-tethys/issues/254209)
* feat(grid): #254209 click favorite style ([f599168](https://github.com/atinc/ngx-tethys/commit/f599168)), closes [#254209](https://github.com/atinc/ngx-tethys/issues/254209)
* feat(grid): #254209 pr review question ([cc213c2](https://github.com/atinc/ngx-tethys/commit/cc213c2)), closes [#254209](https://github.com/atinc/ngx-tethys/issues/254209)
* refactor(flexible-text): add thyContainer argument ([539c0e2](https://github.com/atinc/ngx-tethys/commit/539c0e2))
* refactor(flexible-text): support thyContainContainerClass(#257211) ([8558df6](https://github.com/atinc/ngx-tethys/commit/8558df6)), closes [#257211](https://github.com/atinc/ngx-tethys/issues/257211)



## <small>7.5.5 (2019-08-12)</small>

* fix(grid): #252531 fix sort style ([9a4640f](https://github.com/atinc/ngx-tethys/commit/9a4640f))
* fix(property-operation): fix hover icon style and change demo  #256410 ([22c0ead](https://github.com/atinc/ngx-tethys/commit/22c0ead)), closes [#256410](https://github.com/atinc/ngx-tethys/issues/256410)
* fix(transfer): fix repeated value when assign data ([36c68fb](https://github.com/atinc/ngx-tethys/commit/36c68fb))
* fix(tree): fix covert tree node bug when key is empty string ([0cf1164](https://github.com/atinc/ngx-tethys/commit/0cf1164))



## <small>7.5.4 (2019-08-09)</small>

* chore(release): upgrade to 7.5.4 ([2b6462e](https://github.com/atinc/ngx-tethys/commit/2b6462e))
* feat(dialog): dialog footer padding  modify(#257040) ([bfb04af](https://github.com/atinc/ngx-tethys/commit/bfb04af)), closes [#257040](https://github.com/atinc/ngx-tethys/issues/257040)
* feat(popover): support panel class and inside closable #256645 ([c9db78e](https://github.com/atinc/ngx-tethys/commit/c9db78e)), closes [#256645](https://github.com/atinc/ngx-tethys/issues/256645)
* fix(list): #256435 grid模式下hover阴影被遮挡 ([55f5b58](https://github.com/atinc/ngx-tethys/commit/55f5b58)), closes [#256435](https://github.com/atinc/ngx-tethys/issues/256435)
* fix(popover): delete animation ([727a238](https://github.com/atinc/ngx-tethys/commit/727a238))
* fix(popover): fix popover build ([e23d5af](https://github.com/atinc/ngx-tethys/commit/e23d5af))
* fix(tree-select): change prefix icon style #239673 ([c767705](https://github.com/atinc/ngx-tethys/commit/c767705)), closes [#239673](https://github.com/atinc/ngx-tethys/issues/239673)




## <small>7.5.3 (2019-08-08)</small>

* feat: add demo ([88dbcb2](https://github.com/atinc/ngx-tethys/commit/88dbcb2))
* feat: add thy-typography-rich ([e9b9a80](https://github.com/atinc/ngx-tethys/commit/e9b9a80))
* feat(icon-text): icon padding ([1d9f230](https://github.com/atinc/ngx-tethys/commit/1d9f230))
* feat(nav): ui ([4ec6717](https://github.com/atinc/ngx-tethys/commit/4ec6717))
* feat(store): add clearState fn and add test case(#255027) ([7e55f00](https://github.com/atinc/ngx-tethys/commit/7e55f00)), closes [#255027](https://github.com/atinc/ngx-tethys/issues/255027)
* feat(tree-select): support node icon template #239673 ([044d63f](https://github.com/atinc/ngx-tethys/commit/044d63f)), closes [#239673](https://github.com/atinc/ngx-tethys/issues/239673)
* feat(variables): add close color variables ([e1671bf](https://github.com/atinc/ngx-tethys/commit/e1671bf))
* chore(release): upgrade to 7.5.2 ([dd19f9f](https://github.com/atinc/ngx-tethys/commit/dd19f9f))
* fix: pre code style ([41e36f9](https://github.com/atinc/ngx-tethys/commit/41e36f9))
* fix: typography style ([8a0bbdc](https://github.com/atinc/ngx-tethys/commit/8a0bbdc))
* fix: typography style ([d0257e2](https://github.com/atinc/ngx-tethys/commit/d0257e2))
* fix: 文本改成排版 ([23e0058](https://github.com/atinc/ngx-tethys/commit/23e0058))
* fix(agile): #255003 thy-nav下加button按钮，button的thy-icon颜色失效 ([c3ae8a2](https://github.com/atinc/ngx-tethys/commit/c3ae8a2)), closes [#255003](https://github.com/atinc/ngx-tethys/issues/255003)
* fix(button): change button padding ([c1abbb0](https://github.com/atinc/ngx-tethys/commit/c1abbb0))
* fix(dialog): change box shadow and backdrop shadow ([5aa67bb](https://github.com/atinc/ngx-tethys/commit/5aa67bb))
* fix(link): move thy-icon font-size 14px to link-has-icon ([c26f617](https://github.com/atinc/ngx-tethys/commit/c26f617))
* fix(notify): adjust title position #255598 ([14e0adb](https://github.com/atinc/ngx-tethys/commit/14e0adb)), closes [#255598](https://github.com/atinc/ngx-tethys/issues/255598)



## <small>7.5.2 (2019-08-07)</small>

* fix: pre code style ([41e36f9](https://github.com/atinc/ngx-tethys/commit/41e36f9))
* fix: typography style ([8a0bbdc](https://github.com/atinc/ngx-tethys/commit/8a0bbdc))
* fix: typography style ([d0257e2](https://github.com/atinc/ngx-tethys/commit/d0257e2))
* fix: 文本改成排版 ([23e0058](https://github.com/atinc/ngx-tethys/commit/23e0058))
* fix(agile): #255003 thy-nav下加button按钮，button的thy-icon颜色失效 ([c3ae8a2](https://github.com/atinc/ngx-tethys/commit/c3ae8a2)), closes [#255003](https://github.com/atinc/ngx-tethys/issues/255003)
* fix(button): change button padding ([c1abbb0](https://github.com/atinc/ngx-tethys/commit/c1abbb0))
* fix(dialog): change box shadow and backdrop shadow ([5aa67bb](https://github.com/atinc/ngx-tethys/commit/5aa67bb))
* fix(link): move thy-icon font-size 14px to link-has-icon ([c26f617](https://github.com/atinc/ngx-tethys/commit/c26f617))
* fix(notify): adjust title position #255598 ([14e0adb](https://github.com/atinc/ngx-tethys/commit/14e0adb)), closes [#255598](https://github.com/atinc/ngx-tethys/issues/255598)
* feat: add demo ([88dbcb2](https://github.com/atinc/ngx-tethys/commit/88dbcb2))
* feat(icon-text): icon padding ([1d9f230](https://github.com/atinc/ngx-tethys/commit/1d9f230))
* feat(store): add clearState fn and add test case(#255027) ([7e55f00](https://github.com/atinc/ngx-tethys/commit/7e55f00)), closes [#255027](https://github.com/atinc/ngx-tethys/issues/255027)



## <small>7.5.1 (2019-08-02)</small>

* fix: export popover and flexible-text for build ngx-styx erros ([53948f5](https://github.com/atinc/ngx-tethys/commit/53948f5))
* fix(action-menu): action-menu max ui ([6b2bca7](https://github.com/atinc/ngx-tethys/commit/6b2bca7))
* fix(datepicker-range): ui ([652b816](https://github.com/atinc/ngx-tethys/commit/652b816))
* fix(nav): fix focus nav thy icon style ([8a99c72](https://github.com/atinc/ngx-tethys/commit/8a99c72))
* fix(nav): fix thy icon in nav style ([a783d61](https://github.com/atinc/ngx-tethys/commit/a783d61))
* fix(notify): add link hover state ([0bff8ef](https://github.com/atinc/ngx-tethys/commit/0bff8ef))
* fix(notify): adjust notify style ([3699f0e](https://github.com/atinc/ngx-tethys/commit/3699f0e))
* fix(notify): del notify detail target blank ([c4c0b53](https://github.com/atinc/ngx-tethys/commit/c4c0b53))
* fix(notify): del start host ([623f8c4](https://github.com/atinc/ngx-tethys/commit/623f8c4))
* fix(popover): remove thy-popover-opened class when popover closed ([f7abd64](https://github.com/atinc/ngx-tethys/commit/f7abd64))
* feat: support tooltipPin;add global config provider ([b872c1f](https://github.com/atinc/ngx-tethys/commit/b872c1f))
* feat(button): change md from 36 to 32 and default 38 to 36 #253484 ([720d3c3](https://github.com/atinc/ngx-tethys/commit/720d3c3)), closes [#253484](https://github.com/atinc/ngx-tethys/issues/253484)
* feat(dialog): add full size and box shadow #252859 ([3648cee](https://github.com/atinc/ngx-tethys/commit/3648cee)), closes [#252859](https://github.com/atinc/ngx-tethys/issues/252859)
* docs: refactor global demo contains link, variables, reboot ([6155316](https://github.com/atinc/ngx-tethys/commit/6155316))



## 7.5.0 (2019-07-29)

* feat: add component flexible-text(#247654) ([f23e605](https://github.com/atinc/ngx-tethys/commit/f23e605)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat: support flexible placement;remove failture case(#251211) ([7b6313e](https://github.com/atinc/ngx-tethys/commit/7b6313e)), closes [#251211](https://github.com/atinc/ngx-tethys/issues/251211)
* feat(action menu): ui ([30995b0](https://github.com/atinc/ngx-tethys/commit/30995b0))
* feat(badge): ui add min-width ([f187422](https://github.com/atinc/ngx-tethys/commit/f187422))
* feat(datepicker): change thy icon ([b78223a](https://github.com/atinc/ngx-tethys/commit/b78223a))
* feat(datepicker): change thy icon ([b18b7e9](https://github.com/atinc/ngx-tethys/commit/b18b7e9))
* feat(drag): drag item line to move it around ([8a3172e](https://github.com/atinc/ngx-tethys/commit/8a3172e))
* feat(flexible-text): add component: flexible-text (#247654) ([89127f0](https://github.com/atinc/ngx-tethys/commit/89127f0)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat(form): change checkbox and radio icon to css3 ([1d0c8f8](https://github.com/atinc/ngx-tethys/commit/1d0c8f8))
* feat(link): add link-major style ([3e9be2e](https://github.com/atinc/ngx-tethys/commit/3e9be2e))
* feat(link): add theme link-major ([1d42681](https://github.com/atinc/ngx-tethys/commit/1d42681))
* feat(popover): add popover module for open content #252700 ([fd8487f](https://github.com/atinc/ngx-tethys/commit/fd8487f)), closes [#252700](https://github.com/atinc/ngx-tethys/issues/252700)
* feat(table): add bottom border  of table #252678 ([ee2d7ba](https://github.com/atinc/ngx-tethys/commit/ee2d7ba)), closes [#252678](https://github.com/atinc/ngx-tethys/issues/252678)
* feat(thy-icon): support legging ([a24bb57](https://github.com/atinc/ngx-tethys/commit/a24bb57))
* feat(thy-icon): support two tone color ([938c6be](https://github.com/atinc/ngx-tethys/commit/938c6be))
* feat(thy-icon): support two tone color, rotate ([8edfdc9](https://github.com/atinc/ngx-tethys/commit/8edfdc9))
* feat(thy-icon): support two tone color, rotate\ ([ee6205d](https://github.com/atinc/ngx-tethys/commit/ee6205d))
* feat(tooltip): add tooltip offset and change tooltip style ([e4c9162](https://github.com/atinc/ngx-tethys/commit/e4c9162))
* feat(transfer): #251417 support fixed item and ([3e846a0](https://github.com/atinc/ngx-tethys/commit/3e846a0))
* fix: add component flexible-text ([b4a17a8](https://github.com/atinc/ngx-tethys/commit/b4a17a8))
* fix: change remove icon in avatar and select ([6a2780a](https://github.com/atinc/ngx-tethys/commit/6a2780a))
* fix: correct constructor.name can is undefine failture(#250980) ([6d6f2d6](https://github.com/atinc/ngx-tethys/commit/6d6f2d6)), closes [#250980](https://github.com/atinc/ngx-tethys/issues/250980)
* fix: fix demo show ([722ac34](https://github.com/atinc/ngx-tethys/commit/722ac34))
* fix: fix flexible-text test ([b73bc69](https://github.com/atinc/ngx-tethys/commit/b73bc69))
* fix: flexible-text hide test ([03c70e6](https://github.com/atinc/ngx-tethys/commit/03c70e6))
* fix: modify avatar and select removed icon style ([8b19df1](https://github.com/atinc/ngx-tethys/commit/8b19df1))
* fix: remove console log ([bf9bd01](https://github.com/atinc/ngx-tethys/commit/bf9bd01))
* fix(button): change button padding and min width #252402 ([65b6856](https://github.com/atinc/ngx-tethys/commit/65b6856)), closes [#252402](https://github.com/atinc/ngx-tethys/issues/252402)
* fix(color): change info color #2dbcff and success to #66c060 #237760 ([0512b4c](https://github.com/atinc/ngx-tethys/commit/0512b4c)), closes [#2](https://github.com/atinc/ngx-tethys/issues/2) [#66c060](https://github.com/atinc/ngx-tethys/issues/66c060) [#237760](https://github.com/atinc/ngx-tethys/issues/237760)
* fix(dialog): change dialog-body overflow, add thy-dialog-content #247676 ([e3e7968](https://github.com/atinc/ngx-tethys/commit/e3e7968)), closes [#247676](https://github.com/atinc/ngx-tethys/issues/247676)
* fix(dialog): set animation state enter after last click position #250111 ([7e306bd](https://github.com/atinc/ngx-tethys/commit/7e306bd)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): set animation state enter after last click position #250111 ([8d2a0fb](https://github.com/atinc/ngx-tethys/commit/8d2a0fb)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): trap focus after animation is void (#251580) ([87de8d1](https://github.com/atinc/ngx-tethys/commit/87de8d1)), closes [#251580](https://github.com/atinc/ngx-tethys/issues/251580)
* fix(flexible-text): fix flexible-text test(#247654) ([c393803](https://github.com/atinc/ngx-tethys/commit/c393803)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* fix(input): change search-input icon styles #249790 ([b470a86](https://github.com/atinc/ngx-tethys/commit/b470a86)), closes [#249790](https://github.com/atinc/ngx-tethys/issues/249790)
* fix(layout): fix header prefix-icon font-size to 20px ([687e978](https://github.com/atinc/ngx-tethys/commit/687e978))
* fix(notify): adjust notify layout#252522 ([f142fdb](https://github.com/atinc/ngx-tethys/commit/f142fdb)), closes [layout#252522](https://github.com/layout/issues/252522)
* fix(slide): fix slide fly in out #247791 ([5d9e56a](https://github.com/atinc/ngx-tethys/commit/5d9e56a)), closes [#247791](https://github.com/atinc/ngx-tethys/issues/247791)
* fix(thy-dialog): correct animation failture ([fb626f0](https://github.com/atinc/ngx-tethys/commit/fb626f0))
* fix(tooltip): change tooltip arrow width ang height ([dfe8eb9](https://github.com/atinc/ngx-tethys/commit/dfe8eb9))
* fix(tooltip): change tooltip-max-width to 350px ([8b54e8b](https://github.com/atinc/ngx-tethys/commit/8b54e8b))
* docs(popover): prefect demo and api parameters #252700 ([76ea3a8](https://github.com/atinc/ngx-tethys/commit/76ea3a8)), closes [#252700](https://github.com/atinc/ngx-tethys/issues/252700)
* refactor: adjust drag style in list and transfer ([f3a3918](https://github.com/atinc/ngx-tethys/commit/f3a3918))
* refactor(flexible-text): refactor content oberve;add test case(#252170) ([1391b9f](https://github.com/atinc/ngx-tethys/commit/1391b9f)), closes [#252170](https://github.com/atinc/ngx-tethys/issues/252170)
* refactor(flexible-text): remove directive file;deprecated rxjs Subject ([f7670ed](https://github.com/atinc/ngx-tethys/commit/f7670ed))
* refactor(icon-text): refactor icon-text ([a5689b9](https://github.com/atinc/ngx-tethys/commit/a5689b9))
* refactor(list): replace wtf with thy-icon ([c309049](https://github.com/atinc/ngx-tethys/commit/c309049))
* refactor(overlay): refactor core overlay utils, add test cases #252700 ([80d2a7a](https://github.com/atinc/ngx-tethys/commit/80d2a7a)), closes [#252700](https://github.com/atinc/ngx-tethys/issues/252700)
* refactor(thy-flexible-text): add directive;refactor element(#247654) ([1699419](https://github.com/atinc/ngx-tethys/commit/1699419)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* refactor(thy-tooltip): refactor tooltip component placement(#251211) ([5a20e21](https://github.com/atinc/ngx-tethys/commit/5a20e21)), closes [#251211](https://github.com/atinc/ngx-tethys/issues/251211)
* style(icon): change icon default size to `1rem` ([38d09f3](https://github.com/atinc/ngx-tethys/commit/38d09f3))
* style(layout): change layout-header-title in center ([5d971c7](https://github.com/atinc/ngx-tethys/commit/5d971c7))
* style(transfer): #252474 fix item and middle icon ([b7ba392](https://github.com/atinc/ngx-tethys/commit/b7ba392))
* Update CHANGELOG.md ([8446b8c](https://github.com/atinc/ngx-tethys/commit/8446b8c))
* chore(release): upgrade to 7.3.5 ([dbe9397](https://github.com/atinc/ngx-tethys/commit/dbe9397))
* chore(release): upgrade to 7.3.6 ([aa52fc7](https://github.com/atinc/ngx-tethys/commit/aa52fc7))
* chore(release): upgrade to 7.4.0 ([5d08a8f](https://github.com/atinc/ngx-tethys/commit/5d08a8f))
* test(alert): fix alert tests #238645 ([bd84872](https://github.com/atinc/ngx-tethys/commit/bd84872)), closes [#238645](https://github.com/atinc/ngx-tethys/issues/238645)



## 7.4.0 (2019-07-26)

* refactor: adjust drag style in list and transfer ([f3a3918](https://github.com/atinc/ngx-tethys/commit/f3a3918))
* refactor(flexible-text): remove directive file;deprecated rxjs Subject ([f7670ed](https://github.com/atinc/ngx-tethys/commit/f7670ed))
* refactor(icon-text): refactor icon-text ([a5689b9](https://github.com/atinc/ngx-tethys/commit/a5689b9))
* refactor(list): replace wtf with thy-icon ([c309049](https://github.com/atinc/ngx-tethys/commit/c309049))
* refactor(thy-flexible-text): add directive;refactor element(#247654) ([1699419](https://github.com/atinc/ngx-tethys/commit/1699419)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* refactor(thy-tooltip): refactor tooltip component placement(#251211) ([5a20e21](https://github.com/atinc/ngx-tethys/commit/5a20e21)), closes [#251211](https://github.com/atinc/ngx-tethys/issues/251211)
* feat: add component flexible-text(#247654) ([f23e605](https://github.com/atinc/ngx-tethys/commit/f23e605)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat: support flexible placement;remove failture case(#251211) ([7b6313e](https://github.com/atinc/ngx-tethys/commit/7b6313e)), closes [#251211](https://github.com/atinc/ngx-tethys/issues/251211)
* feat(drag): drag item line to move it around ([8a3172e](https://github.com/atinc/ngx-tethys/commit/8a3172e))
* feat(flexible-text): add component: flexible-text (#247654) ([89127f0](https://github.com/atinc/ngx-tethys/commit/89127f0)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat(link): add link-major style ([3e9be2e](https://github.com/atinc/ngx-tethys/commit/3e9be2e))
* feat(link): add theme link-major ([1d42681](https://github.com/atinc/ngx-tethys/commit/1d42681))
* feat(thy-icon): support legging ([a24bb57](https://github.com/atinc/ngx-tethys/commit/a24bb57))
* feat(thy-icon): support two tone color ([938c6be](https://github.com/atinc/ngx-tethys/commit/938c6be))
* feat(thy-icon): support two tone color, rotate ([8edfdc9](https://github.com/atinc/ngx-tethys/commit/8edfdc9))
* feat(thy-icon): support two tone color, rotate\ ([ee6205d](https://github.com/atinc/ngx-tethys/commit/ee6205d))
* feat(transfer): #251417 support fixed item and ([3e846a0](https://github.com/atinc/ngx-tethys/commit/3e846a0))
* style(icon): change icon default size to `1rem` ([38d09f3](https://github.com/atinc/ngx-tethys/commit/38d09f3))
* style(layout): change layout-header-title in center ([5d971c7](https://github.com/atinc/ngx-tethys/commit/5d971c7))
* fix: add component flexible-text ([b4a17a8](https://github.com/atinc/ngx-tethys/commit/b4a17a8))
* fix: change remove icon in avatar and select ([6a2780a](https://github.com/atinc/ngx-tethys/commit/6a2780a))
* fix: correct constructor.name can is undefine failture(#250980) ([6d6f2d6](https://github.com/atinc/ngx-tethys/commit/6d6f2d6)), closes [#250980](https://github.com/atinc/ngx-tethys/issues/250980)
* fix: fix demo show ([722ac34](https://github.com/atinc/ngx-tethys/commit/722ac34))
* fix: fix flexible-text test ([b73bc69](https://github.com/atinc/ngx-tethys/commit/b73bc69))
* fix: flexible-text hide test ([03c70e6](https://github.com/atinc/ngx-tethys/commit/03c70e6))
* fix: modify avatar and select removed icon style ([8b19df1](https://github.com/atinc/ngx-tethys/commit/8b19df1))
* fix: remove console log ([bf9bd01](https://github.com/atinc/ngx-tethys/commit/bf9bd01))
* fix(color): change info color #2dbcff and success to #66c060 #237760 ([0512b4c](https://github.com/atinc/ngx-tethys/commit/0512b4c)), closes [#2](https://github.com/atinc/ngx-tethys/issues/2) [#66c060](https://github.com/atinc/ngx-tethys/issues/66c060) [#237760](https://github.com/atinc/ngx-tethys/issues/237760)
* fix(dialog): set animation state enter after last click position #250111 ([7e306bd](https://github.com/atinc/ngx-tethys/commit/7e306bd)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): set animation state enter after last click position #250111 ([8d2a0fb](https://github.com/atinc/ngx-tethys/commit/8d2a0fb)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): trap focus after animation is void (#251580) ([87de8d1](https://github.com/atinc/ngx-tethys/commit/87de8d1)), closes [#251580](https://github.com/atinc/ngx-tethys/issues/251580)
* fix(flexible-text): fix flexible-text test(#247654) ([c393803](https://github.com/atinc/ngx-tethys/commit/c393803)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* fix(layout): fix header prefix-icon font-size to 20px ([687e978](https://github.com/atinc/ngx-tethys/commit/687e978))
* fix(thy-dialog): correct animation failture ([fb626f0](https://github.com/atinc/ngx-tethys/commit/fb626f0))
* fix(tooltip): change tooltip arrow width ang height ([dfe8eb9](https://github.com/atinc/ngx-tethys/commit/dfe8eb9))
* fix(tooltip): change tooltip-max-width to 350px ([8b54e8b](https://github.com/atinc/ngx-tethys/commit/8b54e8b))
* test(alert): fix alert tests #238645 ([bd84872](https://github.com/atinc/ngx-tethys/commit/bd84872)), closes [#238645](https://github.com/atinc/ngx-tethys/issues/238645)
* chore(release): upgrade to 7.3.5 ([dbe9397](https://github.com/atinc/ngx-tethys/commit/dbe9397))
* chore(release): upgrade to 7.3.6 ([aa52fc7](https://github.com/atinc/ngx-tethys/commit/aa52fc7))

## <small>7.3.6 (2019-07-23)</small>

* fix: add component flexible-text ([b4a17a8](https://github.com/atinc/ngx-tethys/commit/b4a17a8))
* fix: change remove icon in avatar and select ([6a2780a](https://github.com/atinc/ngx-tethys/commit/6a2780a))
* fix: correct constructor.name can is undefine failture(#250980) ([6d6f2d6](https://github.com/atinc/ngx-tethys/commit/6d6f2d6)), closes [#250980](https://github.com/atinc/ngx-tethys/issues/250980)
* fix: fix flexible-text test ([b73bc69](https://github.com/atinc/ngx-tethys/commit/b73bc69))
* fix: flexible-text hide test ([03c70e6](https://github.com/atinc/ngx-tethys/commit/03c70e6))
* fix: modify avatar and select removed icon style ([8b19df1](https://github.com/atinc/ngx-tethys/commit/8b19df1))
* fix(color): change info color #2dbcff and success to #66c060 #237760 ([0512b4c](https://github.com/atinc/ngx-tethys/commit/0512b4c)), closes [#2](https://github.com/atinc/ngx-tethys/issues/2) [#66c060](https://github.com/atinc/ngx-tethys/issues/66c060) [#237760](https://github.com/atinc/ngx-tethys/issues/237760)
* fix(dialog): set animation state enter after last click position #250111 ([8d2a0fb](https://github.com/atinc/ngx-tethys/commit/8d2a0fb)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): set animation state enter after last click position #250111 ([7e306bd](https://github.com/atinc/ngx-tethys/commit/7e306bd)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(flexible-text): fix flexible-text test(#247654) ([c393803](https://github.com/atinc/ngx-tethys/commit/c393803)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* fix(thy-dialog): correct animation failture ([fb626f0](https://github.com/atinc/ngx-tethys/commit/fb626f0))
* fix(tooltip): change tooltip arrow width ang height ([dfe8eb9](https://github.com/atinc/ngx-tethys/commit/dfe8eb9))
* fix(tooltip): change tooltip-max-width to 350px ([8b54e8b](https://github.com/atinc/ngx-tethys/commit/8b54e8b))
* chore(release): upgrade to 7.3.5 ([dbe9397](https://github.com/atinc/ngx-tethys/commit/dbe9397))
* feat: add component flexible-text(#247654) ([f23e605](https://github.com/atinc/ngx-tethys/commit/f23e605)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat(flexible-text): add component: flexible-text (#247654) ([89127f0](https://github.com/atinc/ngx-tethys/commit/89127f0)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)



## <small>7.3.5 (2019-07-23)</small>

* fix: add component flexible-text ([b4a17a8](https://github.com/atinc/ngx-tethys/commit/b4a17a8))
* fix: correct constructor.name can is undefine failture(#250980) ([6d6f2d6](https://github.com/atinc/ngx-tethys/commit/6d6f2d6)), closes [#250980](https://github.com/atinc/ngx-tethys/issues/250980)
* fix: fix flexible-text test ([b73bc69](https://github.com/atinc/ngx-tethys/commit/b73bc69))
* fix: flexible-text hide test ([03c70e6](https://github.com/atinc/ngx-tethys/commit/03c70e6))
* fix: modify avatar and select removed icon style ([8b19df1](https://github.com/atinc/ngx-tethys/commit/8b19df1))
* fix(color): change info color #2dbcff and success to #66c060 #237760 ([0512b4c](https://github.com/atinc/ngx-tethys/commit/0512b4c)), closes [#2](https://github.com/atinc/ngx-tethys/issues/2) [#66c060](https://github.com/atinc/ngx-tethys/issues/66c060) [#237760](https://github.com/atinc/ngx-tethys/issues/237760)
* fix(dialog): set animation state enter after last click position #250111 ([8d2a0fb](https://github.com/atinc/ngx-tethys/commit/8d2a0fb)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(dialog): set animation state enter after last click position #250111 ([7e306bd](https://github.com/atinc/ngx-tethys/commit/7e306bd)), closes [#250111](https://github.com/atinc/ngx-tethys/issues/250111)
* fix(flexible-text): fix flexible-text test(#247654) ([c393803](https://github.com/atinc/ngx-tethys/commit/c393803)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* fix(tooltip): change tooltip arrow width ang height ([dfe8eb9](https://github.com/atinc/ngx-tethys/commit/dfe8eb9))
* fix(tooltip): change tooltip-max-width to 350px ([8b54e8b](https://github.com/atinc/ngx-tethys/commit/8b54e8b))
* feat: add component flexible-text(#247654) ([f23e605](https://github.com/atinc/ngx-tethys/commit/f23e605)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)
* feat(flexible-text): add component: flexible-text (#247654) ([89127f0](https://github.com/atinc/ngx-tethys/commit/89127f0)), closes [#247654](https://github.com/atinc/ngx-tethys/issues/247654)



## <small>7.3.4 (2019-07-19)</small>

* feat(badge): supports thyColor to custom color ([443a4e1](https://github.com/atinc/ngx-tethys/commit/443a4e1))
* fix(pagination): change default pre next icon#249965 ([6ce6e23](https://github.com/atinc/ngx-tethys/commit/6ce6e23)), closes [icon#249965](https://github.com/icon/issues/249965)
* fix(tooltip): change padding y to fix tooltip content shake ([851dc02](https://github.com/atinc/ngx-tethys/commit/851dc02))
* fix(tooltip): change tooltip box shadow ([21049fa](https://github.com/atinc/ngx-tethys/commit/21049fa))
* fix(tooltip): remove  box-shadow ([e649b62](https://github.com/atinc/ngx-tethys/commit/e649b62))
* docs(layout): change demo icon house to house-square ([b6222a9](https://github.com/atinc/ngx-tethys/commit/b6222a9))



## <small>7.3.3 (2019-07-17)</small>

* fix: input readonly ([a802715](https://github.com/atinc/ngx-tethys/commit/a802715))
* fix: name is readonly ([c04473a](https://github.com/atinc/ngx-tethys/commit/c04473a))
* fix(action-menu): del action menu item hover transition animation#249049 ([bb48cbb](https://github.com/atinc/ngx-tethys/commit/bb48cbb)), closes [animation#249049](https://github.com/animation/issues/249049)
* fix(breadcrumb): delete unexpected ngif ([5a9a0c7](https://github.com/atinc/ngx-tethys/commit/5a9a0c7))
* fix(breadcrumb): use if else when more than one ngif ([2281908](https://github.com/atinc/ngx-tethys/commit/2281908))
* fix(form): change form label text color #247688 ([5335257](https://github.com/atinc/ngx-tethys/commit/5335257)), closes [#247688](https://github.com/atinc/ngx-tethys/issues/247688)
* fix(pbox): pbox margin-top ([f13154c](https://github.com/atinc/ngx-tethys/commit/f13154c))
* fix(property-operation): icon size ([65f9b42](https://github.com/atinc/ngx-tethys/commit/65f9b42))
* fix(select-item): modify select item hover background color #248506 ([ba48a60](https://github.com/atinc/ngx-tethys/commit/ba48a60)), closes [#248506](https://github.com/atinc/ngx-tethys/issues/248506)
* refactor(layout): change title-name icon margin left to 6px #249416 ([2afd047](https://github.com/atinc/ngx-tethys/commit/2afd047)), closes [#249416](https://github.com/atinc/ngx-tethys/issues/249416)
* test(layout): add some test cases for layout #249416 ([fea76c9](https://github.com/atinc/ngx-tethys/commit/fea76c9)), closes [#249416](https://github.com/atinc/ngx-tethys/issues/249416)
* feat(breadcrumb): svg icon is compatible with wtf icon #249141 ([2815dbd](https://github.com/atinc/ngx-tethys/commit/2815dbd)), closes [#249141](https://github.com/atinc/ngx-tethys/issues/249141)
* feat(icon): add icon position middle mixin ([20e4fdd](https://github.com/atinc/ngx-tethys/commit/20e4fdd))
* feat(layout): change header support separator and icon link #249416 ([0d3cd75](https://github.com/atinc/ngx-tethys/commit/0d3cd75)), closes [#249416](https://github.com/atinc/ngx-tethys/issues/249416)
* chore(release): upgrade to 7.3.2 ([5f08ad6](https://github.com/atinc/ngx-tethys/commit/5f08ad6))



## <small>7.3.2 (2019-07-15)</small>

* fix: clear hover when empty ([4682e56](https://github.com/atinc/ngx-tethys/commit/4682e56) [553edf5](https://github.com/atinc/ngx-tethys/commit/553edf5))
* fix: title remove cursor ([38b6d5c](https://github.com/atinc/ngx-tethys/commit/38b6d5c))
* fix(nav): modify nav icon spacing variable ([f03f591](https://github.com/atinc/ngx-tethys/commit/f03f591))
* fix(slide): fix slide height variable ([fbd71c3](https://github.com/atinc/ngx-tethys/commit/fbd71c3))
* build: remove changelog-p angular, beacuse it filter refactor commit ([9239c2c](https://github.com/atinc/ngx-tethys/commit/9239c2c))
* style(form): change form label text color #247688 ([af79d22](https://github.com/atinc/ngx-tethys/commit/af79d22)), closes [#247688](https://github.com/atinc/ngx-tethys/issues/247688)
* refactor(breadcrumb): use thy icon in breadcrumb ([6f262f6](https://github.com/atinc/ngx-tethys/commit/6f262f6))
* refactor(button): change button group size ([131f5f3](https://github.com/atinc/ngx-tethys/commit/131f5f3))
* refactor(button): change disabled button style #244362 ([4d865cf](https://github.com/atinc/ngx-tethys/commit/4d865cf)), closes [#244362](https://github.com/atinc/ngx-tethys/issues/244362)



## [7.3.1](https://github.com/atinc/ngx-tethys/compare/7.3.0...7.3.1) (2019-07-08)


### Bug Fixes

* **icon:** fix icon style ([066a6a6](https://github.com/atinc/ngx-tethys/commit/066a6a6))
* **label:** compatible icon font ([fd8abc9](https://github.com/atinc/ngx-tethys/commit/fd8abc9)), change variable ([4d0e397](https://github.com/atinc/ngx-tethys/commit/4d0e397))
* **thy-menu:** fix active can not change skin ([d54e131](https://github.com/atinc/ngx-tethys/commit/d54e131))
* **thy-tree:** fix skin can not change ([79c48a5](https://github.com/atinc/ngx-tethys/commit/79c48a5))
* **tooltip:** add ngOnDestroy  and change tooltip style ([1f53570](https://github.com/atinc/ngx-tethys/commit/1f53570))
* fix arrow switcher icon and tooltip spacing ([ef28cdf](https://github.com/atinc/ngx-tethys/commit/ef28cdf))


### Features

* **button:** change thyButton support svg icon ([db85c96](https://github.com/atinc/ngx-tethys/commit/db85c96)), change thyButtonIcon support svg icon [#243057](https://github.com/atinc/ngx-tethys/issues/243057) ([77f38b1](https://github.com/atinc/ngx-tethys/commit/77f38b1))
* **dialog:** change Dialog support svg icon ([a86d30f](https://github.com/atinc/ngx-tethys/commit/a86d30f))
* **grid:** grid support `thyHoverDisplayOperation` and svg icon ([0612f09](https://github.com/atinc/ngx-tethys/commit/0612f09))
* **icon-text:** support svg icon, and add xs size ([f5e7336](https://github.com/atinc/ngx-tethys/commit/f5e7336))
* **label:** support label icon ([18f89cf](https://github.com/atinc/ngx-tethys/commit/18f89cf))  [#245262](https://github.com/atinc/ngx-tethys/issues/245262) ([40fe367](https://github.com/atinc/ngx-tethys/commit/40fe367))
* **layout:** change thyLayout support svg icon ([ffebe20](https://github.com/atinc/ngx-tethys/commit/ffebe20)) ([3314a42](https://github.com/atinc/ngx-tethys/commit/3314a42))
* **menu:** change thyMenu support svg icon ([e3be3d0](https://github.com/atinc/ngx-tethys/commit/e3be3d0))
* **property-operation:** support thy-icon [#243057](https://github.com/atinc/ngx-tethys/issues/243057) ([c93d277](https://github.com/atinc/ngx-tethys/commit/c93d277))
* **tree:** support svg icon and change hover styles ([0c6f0d7](https://github.com/atinc/ngx-tethys/commit/0c6f0d7))



# [7.3.0](https://github.com/atinc/ngx-tethys/compare/7.2.2...7.3.0) (2019-07-02)


### Bug Fixes

* **card:** remove border radius ([bd46bf5](https://github.com/atinc/ngx-tethys/commit/bd46bf5))
* **card:** remove border radius ([f694f14](https://github.com/atinc/ngx-tethys/commit/f694f14))
* **component:** exports component ([fb94df3](https://github.com/atinc/ngx-tethys/commit/fb94df3))
* **datepicker:** datepicker support pointer cursor ([134c0ba](https://github.com/atinc/ngx-tethys/commit/134c0ba))
* **demo:** demo ui and routes ([688e1dc](https://github.com/atinc/ngx-tethys/commit/688e1dc))
* **demo:** fix demo menu url error ([ab95d51](https://github.com/atinc/ngx-tethys/commit/ab95d51))
* **docs:** update docs ([93d591c](https://github.com/atinc/ngx-tethys/commit/93d591c))
* **docs:** update docs ([c1de2e6](https://github.com/atinc/ngx-tethys/commit/c1de2e6))
* **grid:** change grid hover color ([3256172](https://github.com/atinc/ngx-tethys/commit/3256172))
* **icon-text:** icon-text support line-height ([bef71de](https://github.com/atinc/ngx-tethys/commit/bef71de))
* **layout:** layout section remove border radius ([70f3309](https://github.com/atinc/ngx-tethys/commit/70f3309))
* **list:** replace isLayoutGrid with layout ([0e0e9a4](https://github.com/atinc/ngx-tethys/commit/0e0e9a4))
* **pagination:** fix pageChange  multiple calls error ([79766f4](https://github.com/atinc/ngx-tethys/commit/79766f4))
* **progress:** change demo component names ([0a1bee7](https://github.com/atinc/ngx-tethys/commit/0a1bee7))
* **progress:** fix progress bar border radius [#240061](https://github.com/atinc/ngx-tethys/issues/240061) ([cdd0b29](https://github.com/atinc/ngx-tethys/commit/cdd0b29))
* **thy-button:** fix square btn border-radius when thySize is xs ([162b083](https://github.com/atinc/ngx-tethys/commit/162b083))
* **thy-custom-select:** fix thyMode action cant't dynamic change ([47c161e](https://github.com/atinc/ngx-tethys/commit/47c161e))
* **tree:** fix node level not increase error ([662d495](https://github.com/atinc/ngx-tethys/commit/662d495))


### Features

* **alert:** [#238645](https://github.com/atinc/ngx-tethys/issues/238645) alert  添加提示类型 ([0515950](https://github.com/atinc/ngx-tethys/commit/0515950))
* **alert:** [#238645](https://github.com/atinc/ngx-tethys/issues/238645) alert 添加提示类型 ([d6a2ebb](https://github.com/atinc/ngx-tethys/commit/d6a2ebb))
* **alert:** [#238645](https://github.com/atinc/ngx-tethys/issues/238645) alert图标使用thyIcon ([6fea8b1](https://github.com/atinc/ngx-tethys/commit/6fea8b1))
* **grid:** grid support  `table-fixed`  class ([58d7587](https://github.com/atinc/ngx-tethys/commit/58d7587))
* **icon:** add test and add icon name class ([b829439](https://github.com/atinc/ngx-tethys/commit/b829439))
* **icon:** add test and add icon name class ([#242517](https://github.com/atinc/ngx-tethys/issues/242517)) ([c3753c8](https://github.com/atinc/ngx-tethys/commit/c3753c8))
* **icon:** add thyIconType for thyIcon component [#239663](https://github.com/atinc/ngx-tethys/issues/239663) ([62bcfff](https://github.com/atinc/ngx-tethys/commit/62bcfff))
* **icon:** refactor code ([e8a4fe3](https://github.com/atinc/ngx-tethys/commit/e8a4fe3))
* **icon:** refactor code ([b55ae06](https://github.com/atinc/ngx-tethys/commit/b55ae06))
* **icon:** refactor code ([96d55a2](https://github.com/atinc/ngx-tethys/commit/96d55a2))
* **immutable:** add function produce.move ([e6aa6b8](https://github.com/atinc/ngx-tethys/commit/e6aa6b8)), closes [#242119](https://github.com/atinc/ngx-tethys/issues/242119)
* **progress:** add progress styles ([0e1a08f](https://github.com/atinc/ngx-tethys/commit/0e1a08f))
* produce.add()中addOptions支持afterId [#242119](https://github.com/atinc/ngx-tethys/issues/242119) ([4a379df](https://github.com/atinc/ngx-tethys/commit/4a379df))
* **progress:** change tips type is string or templateref ([45a8b4e](https://github.com/atinc/ngx-tethys/commit/45a8b4e))
* **progress:** change variables and example [#240588](https://github.com/atinc/ngx-tethys/issues/240588) ([bc9d528](https://github.com/atinc/ngx-tethys/commit/bc9d528))
* **progress:** support progress show tooltip [#236723](https://github.com/atinc/ngx-tethys/issues/236723) ([dec1646](https://github.com/atinc/ngx-tethys/commit/dec1646))
* **property-operation:** add type input for red color value text ([6dc2914](https://github.com/atinc/ngx-tethys/commit/6dc2914))
* **select:** support thyEnableScrollLoad and  improve api doc ([73dbd0a](https://github.com/atinc/ngx-tethys/commit/73dbd0a))
* **selection-list:** thyLayout support 'list' ([993021f](https://github.com/atinc/ngx-tethys/commit/993021f)), closes [#240509](https://github.com/atinc/ngx-tethys/issues/240509)



## [7.2.2](https://github.com/atinc/ngx-tethys/compare/7.2.1...7.2.2) (2019-06-19)


### Bug Fixes

* **icon:** add thy-icon svg style [#237854](https://github.com/atinc/ngx-tethys/issues/237854) ([0044c8f](https://github.com/atinc/ngx-tethys/commit/0044c8f))
* **slide:** fix slide z-index variable ([f2efb82](https://github.com/atinc/ngx-tethys/commit/f2efb82))
* **thy-custom-select:** fix display error when labelText is empty string ([821e6f0](https://github.com/atinc/ngx-tethys/commit/821e6f0))
* **thy-custom-select:** fix multiple mode style([#238795](https://github.com/atinc/ngx-tethys/issues/238795)) ([245e553](https://github.com/atinc/ngx-tethys/commit/245e553))


### Features

* **icon:** add thy-icon module support icon font and svg icon [#239663](https://github.com/atinc/ngx-tethys/issues/239663) ([27f05c3](https://github.com/atinc/ngx-tethys/commit/27f05c3))
* **icon:** update icons and use svg icon [#237854](https://github.com/atinc/ngx-tethys/issues/237854) ([4c792d0](https://github.com/atinc/ngx-tethys/commit/4c792d0))
* **thy-custom-select:** add thyOnExpandStatusChange event([#238101](https://github.com/atinc/ngx-tethys/issues/238101)) ([81e3633](https://github.com/atinc/ngx-tethys/commit/81e3633))



## [7.2.1](https://github.com/atinc/ngx-tethys/compare/7.2.0...7.2.1) (2019-06-13)


### Bug Fixes

* **arrowswitcher:** add set  thyTotal ([9285d13](https://github.com/atinc/ngx-tethys/commit/9285d13))
* **grid:** grid support new pagination ([5b69e64](https://github.com/atinc/ngx-tethys/commit/5b69e64))
* **input-search:** resolving out of focus change ngModel ([696b9aa](https://github.com/atinc/ngx-tethys/commit/696b9aa))
* **option:** change option style for list and custom-select [#238704](https://github.com/atinc/ngx-tethys/issues/238704) ([3e5b65e](https://github.com/atinc/ngx-tethys/commit/3e5b65e))
* **pagination:** change class name ([1920eaf](https://github.com/atinc/ngx-tethys/commit/1920eaf))
* **pagination:** fix pages disorder error ([045dab8](https://github.com/atinc/ngx-tethys/commit/045dab8))
* **pagination:** set pagination default showQuickJumper ([0ce69c0](https://github.com/atinc/ngx-tethys/commit/0ce69c0))
* **pagination:** style repair ([c2bf095](https://github.com/atinc/ngx-tethys/commit/c2bf095))
* **store:** remove latest snapshot args for Action [#238030](https://github.com/atinc/ngx-tethys/issues/238030) ([16941f0](https://github.com/atinc/ngx-tethys/commit/16941f0))


### Features

* **editable:** add thy-editable-lg and add breaking changes for 7.2.0 ([53f05d8](https://github.com/atinc/ngx-tethys/commit/53f05d8))



## [7.2.1](https://github.com/atinc/ngx-tethys/compare/7.2.0...7.2.1) (2019-06-13)


### Bug Fixes

* **arrowswitcher:** add set  thyTotal ([9285d13](https://github.com/atinc/ngx-tethys/commit/9285d13))
* **grid:** grid support new pagination ([5b69e64](https://github.com/atinc/ngx-tethys/commit/5b69e64))
* **input-search:** resolving out of focus change ngModel ([696b9aa](https://github.com/atinc/ngx-tethys/commit/696b9aa))
* **option:** change option style for list and custom-select [#238704](https://github.com/atinc/ngx-tethys/issues/238704) ([3e5b65e](https://github.com/atinc/ngx-tethys/commit/3e5b65e))
* **pagination:** change class name ([1920eaf](https://github.com/atinc/ngx-tethys/commit/1920eaf))
* **pagination:** fix pages disorder error ([045dab8](https://github.com/atinc/ngx-tethys/commit/045dab8))
* **pagination:** set pagination default showQuickJumper ([0ce69c0](https://github.com/atinc/ngx-tethys/commit/0ce69c0))
* **pagination:** style repair ([c2bf095](https://github.com/atinc/ngx-tethys/commit/c2bf095))
* **store:** remove latest snapshot args for Action [#238030](https://github.com/atinc/ngx-tethys/issues/238030) ([16941f0](https://github.com/atinc/ngx-tethys/commit/16941f0))


### Features

* **editable:** add thy-editable-lg and add breaking changes for 7.2.0 ([53f05d8](https://github.com/atinc/ngx-tethys/commit/53f05d8))



# [7.2.0](https://github.com/atinc/ngx-tethys/compare/7.1.0...7.2.0) (2019-06-05)


### Bug Fixes

* **custom-select:** fix ngModel default empty value error ([d3cd5a8](https://github.com/atinc/ngx-tethys/commit/d3cd5a8))
* **pagination:** fix pagination test ([61ac4e5](https://github.com/atinc/ngx-tethys/commit/61ac4e5))
* **tooltip:** change style as design specification ([b240f95](https://github.com/atinc/ngx-tethys/commit/b240f95))


### Features

* **color:** change success color and add text-desc replace test-info ([9f9e267](https://github.com/atinc/ngx-tethys/commit/9f9e267))
* **editor:** update editor and the way of editor style introduction ([641eca7](https://github.com/atinc/ngx-tethys/commit/641eca7))
* **input:** change input-size-lg font-size and  input-padding-x [#237962](https://github.com/atinc/ngx-tethys/issues/237962) ([b5a9a8f](https://github.com/atinc/ngx-tethys/commit/b5a9a8f))
* **pagination:**  perfect pagination ([faf2711](https://github.com/atinc/ngx-tethys/commit/faf2711))
* **pagination:** add thy-pagination module ([ee6e7d1](https://github.com/atinc/ngx-tethys/commit/ee6e7d1))
* **tooltip:** add tooltip directive and related test cases [#226375](https://github.com/atinc/ngx-tethys/issues/226375) ([19ef7a4](https://github.com/atinc/ngx-tethys/commit/19ef7a4))
* **uploader:** add uploadBulk for batch upload files [#237400](https://github.com/atinc/ngx-tethys/issues/237400) ([8c1adad](https://github.com/atinc/ngx-tethys/commit/8c1adad))


**BREAKING CHANGES**
- **style** add text-desc to replace text-info, will change info's color as #2dbcff in next version, need to change `text-info` to  `text-desc` globally when upgrade 7.2.0
- **editor:** remove thyEditor from ngx-tethys, add @ngx-tethys/editor lib for editor, editor will support rich and markdown mode

# [7.1.0](https://github.com/atinc/ngx-tethys/compare/7.0.45...7.1.0) (2019-05-27)


### Features

* **editor:** update editor doc ([6dfb70d](https://github.com/atinc/ngx-tethys/commit/6dfb70d))
* **progress:** add thy-progress module and releated components [#234877](https://github.com/atinc/ngx-tethys/issues/234877) ([55fe3d9](https://github.com/atinc/ngx-tethys/commit/55fe3d9))

**BREAKING CHANGES**

remove ThyEditorModule from ngx-tethys to @ngx-tethys/editor.
need to add @ngx-tethys/editor to AppModule



## [7.0.45](https://github.com/atinc/ngx-tethys/compare/7.0.44...7.0.45) (2019-05-24)


### Bug Fixes

* export datepicker directive ([94de877](https://github.com/atinc/ngx-tethys/commit/94de877))


### Features

* add thy-scroll directive and add test case ([eae9e6f](https://github.com/atinc/ngx-tethys/commit/eae9e6f))
* **thy-custom-select:** support async load options([#231301](https://github.com/atinc/ngx-tethys/issues/231301)) ([79c8422](https://github.com/atinc/ngx-tethys/commit/79c8422))



## [7.0.44](https://github.com/atinc/ngx-tethys/compare/7.0.42...7.0.44) (2019-05-17)


### Bug Fixes

* add ThyArrowSwitcherEvent ([968fb9b](https://github.com/atinc/ngx-tethys/commit/968fb9b))
* fix arrow switcher thyIndex to ngModel ([69770fb](https://github.com/atinc/ngx-tethys/commit/69770fb))
* **thy-tree-select:** fix layout 、ngModel([#232683](https://github.com/atinc/ngx-tethys/issues/232683)) ([2e61151](https://github.com/atinc/ngx-tethys/commit/2e61151))
* public-api export arrow-switcher ([8b6a22b](https://github.com/atinc/ngx-tethys/commit/8b6a22b))
* **markdown:** change abstract method name setEmoJies to setEmoJis ([e3e771f](https://github.com/atinc/ngx-tethys/commit/e3e771f))
* **pop-box:** fix demo params ([91ce66a](https://github.com/atinc/ngx-tethys/commit/91ce66a))
* **pop-box:** fix pop box click footer or header when mask is true ([84bd07b](https://github.com/atinc/ngx-tethys/commit/84bd07b))
* **pop-box:** fix pop pop box ([70148d6](https://github.com/atinc/ngx-tethys/commit/70148d6))
* **thy-tree-select:** fix init error ([038031d](https://github.com/atinc/ngx-tethys/commit/038031d))
* **thy-tree-select:** fix ngModelType bug ([9b62bc5](https://github.com/atinc/ngx-tethys/commit/9b62bc5))
* remove thy-select-container-wrapper class ([bca09d4](https://github.com/atinc/ngx-tethys/commit/bca09d4))


### Features

* add class.font-size-xlg [#232012](https://github.com/atinc/ngx-tethys/issues/232012) ([3a072b1](https://github.com/atinc/ngx-tethys/commit/3a072b1))



## [7.0.43](https://github.com/atinc/ngx-tethys/compare/7.0.42...7.0.43) (2019-05-13)


### Bug Fixes

* public-api export arrow-switcher ([8b6a22b](https://github.com/atinc/ngx-tethys/commit/8b6a22b))



## [7.0.42](https://github.com/atinc/ngx-tethys/compare/7.0.41...7.0.42) (2019-05-13)


### Bug Fixes

* fix arrow switcher attr name ([b965fd5](https://github.com/atinc/ngx-tethys/commit/b965fd5))
* fix arrow switcher test ([6c8bf79](https://github.com/atinc/ngx-tethys/commit/6c8bf79))
* fix arrow switcher test ([40d5902](https://github.com/atinc/ngx-tethys/commit/40d5902))
* fix arrow-switcher ([a419220](https://github.com/atinc/ngx-tethys/commit/a419220))
* fix eventemitter arguments ([1f65e3f](https://github.com/atinc/ngx-tethys/commit/1f65e3f))
* fix markdown build bug , change test.ts  context ([dda753c](https://github.com/atinc/ngx-tethys/commit/dda753c))
* fix markdown export bug ([26fc888](https://github.com/atinc/ngx-tethys/commit/26fc888))
* **action-menu:** fix action-menu   child items style bug ([93d54a8](https://github.com/atinc/ngx-tethys/commit/93d54a8))


### Features

* add arrow switcher test ([1d12101](https://github.com/atinc/ngx-tethys/commit/1d12101))
* **markdown:** add ThyMarkdownModule and remove thyMarkdownParser path ([dd5645d](https://github.com/atinc/ngx-tethys/commit/dd5645d))
* add arrow switcher ([19fb627](https://github.com/atinc/ngx-tethys/commit/19fb627))



## [7.0.41](https://github.com/atinc/ngx-tethys/compare/7.0.39...7.0.41) (2019-05-08)


### Bug Fixes

* **button:** fix button icon lg size error ([29646a2](https://github.com/atinc/ngx-tethys/commit/29646a2))
* fix trgger-block style ([7e76214](https://github.com/atinc/ngx-tethys/commit/7e76214))
* hide hovertrigger block ([3f95ba6](https://github.com/atinc/ngx-tethys/commit/3f95ba6))
* support thyEmptyStateText ([#227822](https://github.com/atinc/ngx-tethys/issues/227822)) ([32dec06](https://github.com/atinc/ngx-tethys/commit/32dec06))


### Features

* **font:** add two iconfonts is wtf-reopen-o and wtf-ignore-o ([7f2fe99](https://github.com/atinc/ngx-tethys/commit/7f2fe99))
* **layout-header:** add layout header icon font size 18 ([5f48280](https://github.com/atinc/ngx-tethys/commit/5f48280))
* **transfer:** support lock property ([4d93d6b](https://github.com/atinc/ngx-tethys/commit/4d93d6b))
* label test ([9077b2f](https://github.com/atinc/ngx-tethys/commit/9077b2f))
* **tree:** tree support set type and size ([cd05bc7](https://github.com/atinc/ngx-tethys/commit/cd05bc7))
* add MixinBase and loadingDone mixin to behaviors ([1b43f17](https://github.com/atinc/ngx-tethys/commit/1b43f17))



## [7.0.40](https://github.com/atinc/ngx-tethys/compare/7.0.39...7.0.40) (2019-04-28)


### Bug Fixes

* fix trgger-block style ([7e76214](https://github.com/atinc/ngx-tethys/commit/7e76214))
* hide hovertrigger block ([3f95ba6](https://github.com/atinc/ngx-tethys/commit/3f95ba6))
* support thyEmptyStateText ([#227822](https://github.com/atinc/ngx-tethys/issues/227822)) ([32dec06](https://github.com/atinc/ngx-tethys/commit/32dec06))


### Features

* **tree:** tree support set type and size ([cd05bc7](https://github.com/atinc/ngx-tethys/commit/cd05bc7))
* add MixinBase and loadingDone mixin to behaviors ([1b43f17](https://github.com/atinc/ngx-tethys/commit/1b43f17))



## [7.0.39](https://github.com/atinc/ngx-tethys/compare/7.0.38...7.0.39) (2019-04-26)


### Bug Fixes

* **thy-custom-select:** auto width and open state ([2e0b42b](https://github.com/atinc/ngx-tethys/commit/2e0b42b))


### Features

* **thy-custom:** add hover trigger open ([afdae7f](https://github.com/atinc/ngx-tethys/commit/afdae7f))



## [7.0.38](https://github.com/atinc/ngx-tethys/compare/7.0.37...7.0.38) (2019-04-25)


### Bug Fixes

* **dialog-comfirm:** fix dialog-confirm header question icon ([39f7934](https://github.com/atinc/ngx-tethys/commit/39f7934))
* **thy-editor:** autofocus border hignlite ([a8149c1](https://github.com/atinc/ngx-tethys/commit/a8149c1))
* menu ([0b9c03c](https://github.com/atinc/ngx-tethys/commit/0b9c03c))
* **slide:** 修复slide container的高度问题 ([09dc8df](https://github.com/atinc/ngx-tethys/commit/09dc8df))
* **store:** remove any property definition from Store ([22b3f53](https://github.com/atinc/ngx-tethys/commit/22b3f53))
* **store:** remove any property definition from Store ([3d75af2](https://github.com/atinc/ngx-tethys/commit/3d75af2))
* menu ([667bee7](https://github.com/atinc/ngx-tethys/commit/667bee7))



## [7.0.37](https://github.com/atinc/ngx-tethys/compare/7.0.36...7.0.37) (2019-04-18)


### Bug Fixes

* **form:** fix form-group-error horizontal state style error ([3425ed0](https://github.com/atinc/ngx-tethys/commit/3425ed0))
* **tree:** fix tree `addTreeNode` can't find service bug ([ac9b791](https://github.com/atinc/ngx-tethys/commit/ac9b791))
* `list` 拖动样式 ([a3df3da](https://github.com/atinc/ngx-tethys/commit/a3df3da))
* `list` 拖动样式 ([0878418](https://github.com/atinc/ngx-tethys/commit/0878418))
* 修改list拖动 ([93de6b3](https://github.com/atinc/ngx-tethys/commit/93de6b3))


### Features

* **dialog:** add size supper-lg and perfect dialog test cases ([a3b2ca3](https://github.com/atinc/ngx-tethys/commit/a3b2ca3))
* `menu`、`tree`、`list` 拖动的样式 ([f1d16ee](https://github.com/atinc/ngx-tethys/commit/f1d16ee))
* `menu`、`tree`、`list` 拖动的样式 ([3a08ed0](https://github.com/atinc/ngx-tethys/commit/3a08ed0))
* `menu`、`tree`、`list` 拖动的样式 ([d77ef97](https://github.com/atinc/ngx-tethys/commit/d77ef97))



## [7.0.36](https://github.com/atinc/ngx-tethys/compare/7.0.35...7.0.36) (2019-04-11)


### Bug Fixes

* **slide:** del demo header attribute ([3ed3941](https://github.com/atinc/ngx-tethys/commit/3ed3941))
* **slide:** del options property slide ([10f7b00](https://github.com/atinc/ngx-tethys/commit/10f7b00))
* **slide:** fix slide z-index ([6341e01](https://github.com/atinc/ngx-tethys/commit/6341e01))
* **slide:** 修改slide container 参数名称 ([52a50bb](https://github.com/atinc/ngx-tethys/commit/52a50bb))


### Features

* **slide:** slide container支持传入类名 ([765e9f1](https://github.com/atinc/ngx-tethys/commit/765e9f1))



## [7.0.35](https://github.com/atinc/ngx-tethys/compare/7.0.33...7.0.35) (2019-04-11)


### Bug Fixes

* **select:** 去除select的arrow zindex值样式,修复slide组件无法覆盖select arrow的bug ([307bdb5](https://github.com/atinc/ngx-tethys/commit/307bdb5))
* **slide:** del demo header attribute ([3ed3941](https://github.com/atinc/ngx-tethys/commit/3ed3941))
* **slide:** del options property slide ([10f7b00](https://github.com/atinc/ngx-tethys/commit/10f7b00))
* **slide:** fix slide z-index ([6341e01](https://github.com/atinc/ngx-tethys/commit/6341e01))
* **slide:** 修改slide container 参数名称 ([52a50bb](https://github.com/atinc/ngx-tethys/commit/52a50bb))
* **slide:** 修改slide组件的zIndex值,修复在某些组件和slide共存时,slide组件zIndex值过低的问题 ([f6441a9](https://github.com/atinc/ngx-tethys/commit/f6441a9))
* **slide:** 修改slide组件的zIndex值,修复在某些组件和slide共存时,slide组件zIndex值过低的问题 ([7bb2d64](https://github.com/atinc/ngx-tethys/commit/7bb2d64))


### Features

* **slide:** slide container支持传入类名 ([765e9f1](https://github.com/atinc/ngx-tethys/commit/765e9f1))
* **slide:** 新增slide-layout组件，组件包含header，body，footer三部分，由于更改了过去的布局方式，之前使用slide-header和slide-body的地方请负责相关模块的同学在组件内使用slide-layout包一下 ([ea12ed5](https://github.com/atinc/ngx-tethys/commit/ea12ed5))


### Performance Improvements

* **slide:** 去除onpush模式,修改了slide-header-main中自定义模板的名称,以防止和自定义模板头容易混淆 ([0d4bf69](https://github.com/atinc/ngx-tethys/commit/0d4bf69))



## [7.0.34](https://github.com/atinc/ngx-tethys/compare/7.0.33...7.0.34) (2019-04-04)

### Bug Fixes

-   **select:** 去除 select 的 arrow zindex 值样式,修复 slide 组件无法覆盖 select arrow 的 bug ([307bdb5](https://github.com/atinc/ngx-tethys/commit/307bdb5))
-   **slide:** 修改 slide 组件的 zIndex 值,修复在某些组件和 slide 共存时,slide 组件 zIndex 值过低的问题 ([f6441a9](https://github.com/atinc/ngx-tethys/commit/f6441a9))
-   **slide:** 修改 slide 组件的 zIndex 值,修复在某些组件和 slide 共存时,slide 组件 zIndex 值过低的问题 ([7bb2d64](https://github.com/atinc/ngx-tethys/commit/7bb2d64))

### Features

-   **slide:** 新增 slide-layout 组件，组件包含 header，body，footer 三部分，由于更改了过去的布局方式，之前使用 slide-header 和 slide-body 的地方请负责相关模块的同学在组件内使用 slide-layout 包一下 ([ea12ed5](https://github.com/atinc/ngx-tethys/commit/ea12ed5))

### Performance Improvements

-   **slide:** 去除 onpush 模式,修改了 slide-header-main 中自定义模板的名称,以防止和自定义模板头容易混淆 ([0d4bf69](https://github.com/atinc/ngx-tethys/commit/0d4bf69))

## 7.0.33 (2019-04-03)

### Bug Fixes

-   build error ([4163bea](https://github.com/atinc/ngx-tethys/commit/4163bea))
-   **select-custom:** custom-select 组件打开后搜索在关闭，showOptions ([ad2909d](https://github.com/atinc/ngx-tethys/commit/ad2909d))
-   **thy-enter:** 去除 thy-enter 触发时间 preventDefault 的调用，交给用户处理 ([6b24160](https://github.com/atinc/ngx-tethys/commit/6b24160))

### Reverts

-   7.0.32 ([2eb7013](https://github.com/atinc/ngx-tethys/commit/2eb7013))

### BREAKING CHANGES

-   **thy-enter:** #31

## 7.0.32

-   thy-breadcrumb 新增 thySeparator 属性，支持 slash | backslash 默认 arrow 箭头
-   util 新增操作数组的 immutable 类库 produce, 支持 `add`, `remove`, `update` 方法
    ```
    produce([users]).add(Entity);
    produce([users]).remove(id);
    produce([users]).update(id, {name: 'new name'});
    ```

## 7.0.31

-   修复 `thyFormGroup` 垂直排列图标显示错位的 Bug
-   修改 Store Action 函数没有副作用返回值是 Observable 的 Bug
-   修复 Store.select 返回类型的错误问题

## 7.0.30

thyStepper 增加参数 `thyShowStepHeader` 支持简单的步骤切换

## 7.0.29

thyStepper 增加参数 `thyShowStepHeader` 支持简单的步骤切换

## 7.0.28

add immutable util produce function support add, remove, update methods

## 7.0.27

修改 `thyAvatar` 默认大小配置错误问题

## 7.0.26

fix thyMenuItemAction can't bind click event to open popbox

## 7.0.25

修改 `thyEdit` xss 问题修复

## 7.0.24

修改 `thyTreeSelect` 宽度样式的问题

## 7.0.22

修改`$cdk-z-index-overlay` 设置为 1000
修改`input-search` 加载时边框闪烁样式问题

## 7.0.21

修改 `thyMenu` 文本溢出样式问题

## 7.0.20

-   添加滚动条样式;
-   change thyRadio's changeDetection to OnPush;
-   change thyRadioButton's changeDetection to OnPush;
-   change thyRadioGroup's changeDetection to OnPush;
-   change thy-loading's changeDetection to OnPush;

## 7.0.19

`thyEditor` 添加关联

## 7.0.17

`thyTree` ThyDialog OnPush 模式下 tree 异步加载界面不更新问题处理
`thyDialog` ThyDialog thy-dialog-container visible 样式修改的撤销

## 7.0.16

`store` 非单例注入报错处理

## 7.0.14

新增 `thy-sidebar[thyIsDraggableWidth]`， 设置 `thy-sidebar` 宽度可调节

## 7.0.13

`Store` 增加 `Redux_DevTools`
`ThyDialog` 修改容器 Wrapper 样式
修改 `Webpack` 打包相关配置

## 7.0.7

`thyDatepicker` 时间范围选择样式的修改

## 7.0.6

`thyGrid` 新增支持 `thyRowClassName`
`table` 样式支持排除某一行拖拽样式 `table-draggable-ignore-item`

## 7.0.5

`thy-date-range` 当双向绑定的值为空时，根据 `dateRanges` 设置日期区间；当双向绑定的值不为空时，不修改双向绑定的值。

## 7.0.4

修复发布错误。

## 7.0.2

`thyDatepicker` 新增支持设置最大值 `thyMaxDate`、最小值 `thyMaxDate`。

## 7.0.1

注销：ThyDraggableDirective，sky 使用报错

## 7.0.0

依赖库升级到 Angular 7.2.6， bootstrap 4.3.1。
主版本号，更改为随 Angular 主版本。

## 0.2.37

增加支持 ngx-bootstrap 3.2.0 版本

## 0.2.36

npm 发布错误，重新发布

## 0.2.35

新增菜单组件`thyMenu`
`ThyMaxDirective`, `ThyMaxDirective` 支持最大或最小值设置浮点数

## 0.2.34

`thyFileDrop` bug fixed

## 0.2.33

`thy-editor` 支持默认自动伸缩高度,
`thyFileDrop` 禁止上传文件夹、无后缀文件。修复拖拽区域中包含其他拖拽排序导致的交叉影响。

## 0.2.31

`form-validator` 错误信息支持占位符 `{min}` `{max}` `{minlength}` `{maxlength}`

## 0.2.30

bugfix： `thyFileDrop` 拖拽失效

## 0.2.29

修改 cdk `overlay`的`z-index`大于`modal`的`z-index`，避免在`modal`中弹出选择框，选择框被`modal`框遮盖

## 0.2.28

修改 `thy-breadcrumb` 组件样式，支持换肤

## 0.2.27

`thy-slide` 增加参数 `hasBackdrop` 支持幕布的显示隐藏
`thy-tree-select` 弹出样式的修改

## 0.2.26

`thy-tree-select` 组件增加 `[thyChildCountKey]` 支持根据该字段判断是否有子节点

## 0.2.25

增加 `thy-breadcrumb` 面包屑组件
`thy-tree-select` 组件基本功能完成

## 0.2.24

修改 `thy-tree` loading 加载位置错误的 bug
修改 `thyContextMenu` 指令使用 ngZone.runOutside 后 回调事件没调用 ngZone.run 的问题

## 0.2.23

`[thyFileSelect],thy-file-select` 组件增加 `thyAcceptFolder` 支持选择文件夹类型。Fixed `thyMultiple` false 失效 BUG。

## 0.2.22

`thy-grid` 组件增加 `(thyOnRowContextMenu)` 支持行右键操作，`thy-grid-column` 增加 `#header` 自定义模板支持 column header 自定义

## 0.2.21

`thy-tree` 组件部分重构，增加了 `ThyTreeNodeData` 用于规范传入数据格式，增加了 `ThyTreeNode` 类用于对 Node 进行各种操作，增加了 `[thyAsync]` `(thyOnExpandChange)` 用于异步加载。去除了灵活使用方式 Tree（因为可以通过原生 Angular 支持来实现）

## 0.2.20

解决引用组件库 `thy-tree-select` providers useFactory 导致的编辑错误问题

## 0.2.19

修改 editor 上传附件问题

## 0.2.18

临时通过 checkout 0.2.15 版本 解决引用组件库后编译报错问题

## 0.2.17

修改 date-range 左右切换逻辑 修复了当前选择的时期范围是本周（当前周只有两天），interval=7 时左右切换后的范围还是两天的 bug

## 0.2.16

扩展 `thy-property-operation`， 当`thyValue`有值时，可通过设置`thyLabelHasValue=true/false`控制`lable` 是否显示

## 0.2.15

修复 `thy-date-range` 传值不同步的问题

## 0.2.12

添加分页组件 `thy-pagination`
扩展 `thy-date-range` 支持点击隐藏菜单

## 0.2.11

thyeditor 上传图片支持是否多选，文件类型

## 0.2.10

0.2.9 版本发布错误，没有正确发布成功，没有编译新增的代码。

## 0.2.9

1. add EntityStore lite version to support crud operations [ed0e12b844582f5fd08134f18adf8899ce85b9a7](https://github.com/atinc/ngx-tethys/commit/ed0e12b844582f5fd08134f18adf8899ce85b9a7)
2. Store Action 支持直接调用，需要注意的是直接调用第一个参数不是 State，需要通过 this.snapshot 或者 this.getState() 获取 [b1da195096590be45031c2c3a9c45da64a0c8dde](https://github.com/atinc/ngx-tethys/commit/b1da195096590be45031c2c3a9c45da64a0c8dde)

## 0.2.8

扩展 `thy-editor` 支持传入 placeholder

## 0.2.7

修改 `thy-avatar` 背景样式
修复 `thy-input` thyAutofocus 命名错误问题

## 0.2.6

修复 `thy-loading` style

## 0.2.5

修复 `thy-input` focus 状态下没有显示边 bug

## 0.2.4

修改 `thy-input` lg 尺寸的 placeholder 字号改为 14px

## 0.2.3

修改 `thy-input` 支持 thyAutoFocus
扩展 `[min]` `[max]` 验证指令

## 0.2.2

移除 `thy-input-label` 扩展 `thy-input` 添加 `thyLabelText` 属性

## 0.2.1

修改 `thy-alert` scss 和 bootstrap 冲突 bug

## 0.2.0

`thy-form` 支持添加 `form errors`
天机 `thy-from-group-error` 组件用于错误展示

## 0.1.99

添加警示框组件 `thy-alert`
修改 `thy-input` bug

## 0.1.98

`thy-stepper` 支持换肤
`thy-radio-group` 支持错误提示
`datepicker` 组件更新

## 0.1.97

修改 `thy-input` 组件，`thyType` 为 `password` 时，支持密码明文切换
修改 `thy-stepper` 样式，支持选中 step 下方的小箭头
修改单选按钮组 `thyRadioGroup` 支持验证

## 0.1.96

修改单选按钮组 `thyRadioButton` 支持 flex 布局

## 0.1.95

添加单选按钮组 `thyRadioButton`

## 0.1.94

添加步骤条组件 `thy-stepper`

## 0.1.93

扩展 `thy-label-input` 支持 thySize

## 0.1.92

添加 `thy-label-input` 组件

## 0.1.91

修改 `thy-input` 组件样式

## 0.1.90

修改 `thy-input` 组件样式

## 0.1.89

添加 `thy-input` 组件，支持 Input 输入框内自定义前置后置模板

## 0.1.88

fix error for markdown

## 0.1.87

fix build error for styles folder lost.

## 0.1.86

fix build error for ThyFormModule

## 0.1.85

add thyFormValidator feature.

## 0.1.84

1. 修复换肤情况下 Input 输入框移入边框没有变色的 Bug；
1. 新增粉红色换肤；
1. 移除相关无用的引用。

## 0.1.81

1. select-custom add `thyDisabled` property.

## 0.1.80

1. 修复 `thy-selection-list` 的 Bug：当 ngModel 设置的默认值在 `thy-list-option` 中不存在的时候报错的问题，存储默认值，modelChange Emit 的时候返回。

## 0.1.79

1. `thy-selection-list` `thy-list-option` 样式调整以及换肤样式的添加；
1. `thy-custom-select` 样式的修改，使用统一的 thy-option 样式 mixin。

## 0.1.78

`thy-selection-list` 添加 `thyUniqueKey` 属性用于 thyValue 是对象，但是存储选项的 Value 使用唯一 Key 的场景，主要用于选择的列表有不同对象引用，但是表示同一个对象的场景，比如与多个 Member 都是 {id:1,name:'张三'}，但是会来自不同的列表

## 0.1.77

change `thy-selection-list` component support delay load options, the default values can been selected.

## 0.1.76

1. `thy-grid` fix sortable bug ,restore `sortablejs` reference

## 0.1.75

1. replace `WorktileTech/sortablejs`

## 0.1.73

1. `thy-grid` fix column selections bug
1. `thy-tree` remove drag delay

## 0.1.71

`thy-key-selection` support ngModel set default selection values.

## 0.1.71

fix build typings file error, remove `thy-key-selection` component.

## 0.1.70

1. add ThyListModule module, contains `thy-list`,`thy-list-item`, `thy-selection-list`, `thy-list-option` components.
1. `thy-selection-list` support key up, down select option.

## 0.0.68

1. add property-operation component；
1. avatar component optimize and add ThyAvatarService to transform src, so `thySrc` can't input src full path.

## 0.0.45

1. change action menu default not stopPropagation;
1. add Input params `thyStopPropagation` for thyActionMenuToggle directive.

## 0.0.44

1. add ThyPositioningService for set setPosition;
1. change pop box use ThyPositioningService to pop.

## 0.0.22

fix store dispatch subscribe publishRelay

## 0.0.21

export RootStoreModule

## 0.0.20

fix store build error.

## 0.0.19

fix ts define file error.

## 0.0.18

1. add thy-empty component;
1. add thy store for state management.

## 0.0.13

Layout add `thy-content-section` and `thy-content-main` components
