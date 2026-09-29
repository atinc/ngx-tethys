# 文件

- [核心服务与全局配置](core-services.md) - ngx-tethys/core 里被多个组件共用的全局配置、主题信号、表单尺寸、滚动和 mixin，以及只被时间选择器使用的 MiniStore。
- [日期与时间](date-time.md) - 日期、范围、时间和日历如何共用 TinyDate，把 date-fns 与 @date-fns/tz 锁在 peer 版本上，并从 i18n 语言包取文案。
- [表单与校验](forms.md) - thyForm 如何在提交、变更或失焦时校验 Angular 控件，动态表单如何按 schema 建控件，以及多个控件如何共用尺寸和外观。
- [国际化](i18n.md) - ThyI18nService 如何用信号保存五份语言包，injectLocale 如何按模块切片，以及 ThyTranslate 为何不调用 ngx-translate。
- [图标](icons.md) - ThyIcon 如何从 ThyIconRegistry 取 SVG 或字体类，找不到图标时如何报错，以及测试和 ng add 如何对待 @tethys/icons。
- [浮层体系](overlay.md) - ThyAbstractOverlayService 如何用 CDK Overlay 打开和关闭 dialog，以及 popover、slide、autocomplete 与指令型浮层各自复用哪一层。
- [选择控件](selection.md) - thy-option 与 thy-select-control 被哪些选择器共用，以及自定义选择、树选择、级联和自动完成如何打开面板。
- [主题与样式](theming.md) - 构建期用带 !default 的 Sass 变量和公开发布的 styles 入口定制颜色，运行期用 html 的 theme 属性和 ThyThemeStore 切换明暗。
- [瞬时反馈](transient-feedback.md) - notify 与 message 共用一套消息队列和 CDK Overlay 容器，按最大条数淘汰最旧提示，并且不继承对话框那套抽象浮层。
