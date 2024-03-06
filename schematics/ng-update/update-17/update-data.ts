import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export const upgradeData: UpgradeData = {
    classNames: {
        [TargetVersion.V17]: [
            {
                pr: '',
                changes: [
                    {
                        replace: 'ThyActionComponent',
                        replaceWith: 'ThyAction'
                    },
                    {
                        replace: 'ThyActionsComponent',
                        replaceWith: 'ThyActions'
                    },
                    {
                        replace: 'ThyAffixComponent',
                        replaceWith: 'ThyAffix'
                    },
                    {
                        replace: 'ThyAlertComponent',
                        replaceWith: 'ThyAlert'
                    },
                    {
                        replace: 'ThyAnchorLinkComponent',
                        replaceWith: 'ThyAnchorLink'
                    },
                    {
                        replace: 'ThyAnchorComponent',
                        replaceWith: 'ThyAnchor'
                    },
                    {
                        replace: 'ThyArrowSwitcherComponent',
                        replaceWith: 'ThyArrowSwitcher'
                    },
                    {
                        replace: 'ThyAutocompleteComponent',
                        replaceWith: 'ThyAutocomplete'
                    },
                    {
                        replace: 'ThyAvatarComponent',
                        replaceWith: 'ThyAvatar'
                    },
                    {
                        replace: 'ThyBackTopComponent',
                        replaceWith: 'ThyBackTop'
                    },
                    {
                        replace: 'ThyBadgeComponent',
                        replaceWith: 'ThyBadge'
                    },
                    {
                        replace: 'ThyBreadcrumbItemComponent',
                        replaceWith: 'ThyBreadcrumbItem'
                    },
                    {
                        replace: 'ThyBreadcrumbComponent',
                        replaceWith: 'ThyBreadcrumb'
                    },
                    {
                        replace: 'ThyButtonGroupComponent',
                        replaceWith: 'ThyButtonGroup'
                    },
                    {
                        replace: 'ThyButtonIconComponent',
                        replaceWith: 'ThyButtonIcon'
                    },
                    {
                        replace: 'ThyButtonComponent',
                        replaceWith: 'ThyButton'
                    },
                    {
                        replace: 'ThyCalendarHeaderComponent',
                        replaceWith: 'ThyCalendarHeader'
                    },
                    {
                        replace: 'ThyCalendarComponent',
                        replaceWith: 'ThyCalendar'
                    },
                    {
                        replace: 'ThyCardComponent',
                        replaceWith: 'ThyCard'
                    },
                    {
                        replace: 'ThyCardContentComponent',
                        replaceWith: 'ThyCardContent'
                    },
                    {
                        replace: 'ThyCardHeaderComponent',
                        replaceWith: 'ThyCardHeader'
                    },
                    {
                        replace: 'ThyCarouselComponent',
                        replaceWith: 'ThyCarousel'
                    },
                    {
                        replace: 'ThyCascaderComponent',
                        replaceWith: 'ThyCascader'
                    },
                    {
                        replace: 'ThyCheckboxComponent',
                        replaceWith: 'ThyCheckbox'
                    },
                    {
                        replace: 'ThyCollapseItemComponent',
                        replaceWith: 'ThyCollapseItem'
                    },
                    {
                        replace: 'ThyCollapseComponent',
                        replaceWith: 'ThyCollapse'
                    },
                    {
                        replace: 'ThyColorPickerCustomPanelComponent',
                        replaceWith: 'ThyColorPickerCustomPanel'
                    },
                    {
                        replace: 'ThyColorPickerPanelComponent',
                        replaceWith: 'ThyColorPickerPanel'
                    },
                    {
                        replace: 'ThyCommentComponent',
                        replaceWith: 'ThyComment'
                    },
                    {
                        replace: 'BasePickerComponent',
                        replaceWith: 'BasePicker'
                    },
                    {
                        replace: 'ThyDatePickerComponent',
                        replaceWith: 'ThyDatePicker'
                    },
                    {
                        replace: 'ThyMonthPickerComponent',
                        replaceWith: 'ThyMonthPicker'
                    },
                    {
                        replace: 'ThyPickerComponent',
                        replaceWith: 'ThyPicker'
                    },
                    {
                        replace: 'ThyQuarterPickerComponent',
                        replaceWith: 'ThyQuarterPicker'
                    },
                    {
                        replace: 'ThyRangePickerComponent',
                        replaceWith: 'ThyRangePicker'
                    },
                    {
                        replace: 'ThyWeekPickerComponent',
                        replaceWith: 'ThyWeekPicker'
                    },
                    {
                        replace: 'ThyYearPickerComponent',
                        replaceWith: 'ThyYearPicker'
                    },
                    {
                        replace: 'ThyDateRangeComponent',
                        replaceWith: 'ThyDateRange'
                    },
                    {
                        replace: 'ThyDialogContainerComponent',
                        replaceWith: 'ThyDialogContainer'
                    },
                    {
                        replace: 'ThyDividerComponent',
                        replaceWith: 'ThyDivider'
                    },
                    {
                        replace: 'ThyDotComponent',
                        replaceWith: 'ThyDot'
                    },
                    {
                        replace: 'ThyDropdownMenuGroupComponent',
                        replaceWith: 'ThyDropdownMenuGroup'
                    },
                    {
                        replace: 'ThyDropdownMenuDividerComponent',
                        replaceWith: 'ThyDropdownMenuDivider'
                    },
                    {
                        replace: 'ThyDropdownSubmenuComponent',
                        replaceWith: 'ThyDropdownSubmenu'
                    },
                    {
                        replace: 'ThyEmptyComponent',
                        replaceWith: 'ThyEmpty'
                    },
                    {
                        replace: 'ThyFlexibleTextComponent',
                        replaceWith: 'ThyFlexibleText'
                    },
                    {
                        replace: 'ThyFormGroupComponent',
                        replaceWith: 'ThyFormGroup'
                    },
                    {
                        replace: 'ThyGridItemComponent',
                        replaceWith: 'ThyGridItem'
                    },
                    {
                        replace: 'ThyIconComponent',
                        replaceWith: 'ThyIcon'
                    },
                    {
                        replace: 'ThyImageGroupComponent',
                        replaceWith: 'ThyImageGroup'
                    },
                    {
                        replace: 'ThyInputCountComponent',
                        replaceWith: 'ThyInputCount'
                    },
                    {
                        replace: 'ThyInputGroupComponent',
                        replaceWith: 'ThyInputGroup'
                    },
                    {
                        replace: 'ThyInputSearchComponent',
                        replaceWith: 'ThyInputSearch'
                    },
                    {
                        replace: 'ThyInputComponent',
                        replaceWith: 'ThyInput'
                    },
                    {
                        replace: 'ThyInputNumberComponent',
                        replaceWith: 'ThyInputNumber'
                    },
                    {
                        replace: 'ThyContentMainComponent',
                        replaceWith: 'ThyContentMain'
                    },
                    {
                        replace: 'ThyContentSectionComponent',
                        replaceWith: 'ThyContentSection'
                    },
                    {
                        replace: 'ThyContentComponent',
                        replaceWith: 'ThyContent'
                    },
                    {
                        replace: 'ThyHeaderComponent',
                        replaceWith: 'ThyHeader'
                    },
                    {
                        replace: 'ThyLayoutComponent',
                        replaceWith: 'ThyLayout'
                    },
                    {
                        replace: 'ThySidebarContentComponent',
                        replaceWith: 'ThySidebarContent'
                    },
                    {
                        replace: 'ThySidebarFooterComponent',
                        replaceWith: 'ThySidebarFooter'
                    },
                    {
                        replace: 'ThySidebarHeaderComponent',
                        replaceWith: 'ThySidebarHeader'
                    },
                    {
                        replace: 'ThySidebarComponent',
                        replaceWith: 'ThySidebar'
                    },
                    {
                        replace: 'ThyListItemMetaComponent',
                        replaceWith: 'ThyListItemMeta'
                    },
                    {
                        replace: 'ThyListItemComponent',
                        replaceWith: 'ThyListItem'
                    },
                    {
                        replace: 'ThyListComponent',
                        replaceWith: 'ThyList'
                    },
                    {
                        replace: 'ThyLoadingComponent',
                        replaceWith: 'ThyLoading'
                    },
                    {
                        replace: 'ThyMenuComponent',
                        replaceWith: 'ThyMenu'
                    },
                    {
                        replace: 'ThyMessageContainerComponent',
                        replaceWith: 'ThyMessageContainer'
                    },
                    {
                        replace: 'ThyMessageComponent',
                        replaceWith: 'ThyMessage'
                    },
                    {
                        replace: 'ThyNavComponent',
                        replaceWith: 'ThyNav'
                    },
                    {
                        replace: 'ThyNotifyContainerComponent',
                        replaceWith: 'ThyNotifyContainer'
                    },
                    {
                        replace: 'ThyNotifyComponent',
                        replaceWith: 'ThyNotify'
                    },
                    {
                        replace: 'ThyPaginationComponent',
                        replaceWith: 'ThyPagination'
                    },
                    {
                        replace: 'ThyPopoverContainerComponent',
                        replaceWith: 'ThyPopoverContainer'
                    },
                    {
                        replace: 'ThyProgressCircleComponent',
                        replaceWith: 'ThyProgressCircle'
                    },
                    {
                        replace: 'ThyProgressStripComponent',
                        replaceWith: 'ThyProgressStrip'
                    },
                    {
                        replace: 'ThyProgressComponent',
                        replaceWith: 'ThyProgress'
                    },
                    {
                        replace: 'ThyPropertiesComponent',
                        replaceWith: 'ThyProperties'
                    },
                    {
                        replace: 'ThyPropertyItemComponent',
                        replaceWith: 'ThyPropertyItem'
                    },
                    {
                        replace: 'ThyPropertyOperationComponent',
                        replaceWith: 'ThyPropertyOperation'
                    },
                    {
                        replace: 'ThyRadioComponent',
                        replaceWith: 'ThyRadio'
                    },
                    {
                        replace: 'ThyRateItemComponent',
                        replaceWith: 'ThyRateItem'
                    },
                    {
                        replace: 'ThyRateComponent',
                        replaceWith: 'ThyRate'
                    },
                    {
                        replace: 'ThyResizeHandleComponent',
                        replaceWith: 'ThyResizeHandle'
                    },
                    {
                        replace: 'ThyResizeHandlesComponent',
                        replaceWith: 'ThyResizeHandles'
                    },
                    {
                        replace: 'ThyResultComponent',
                        replaceWith: 'ThyResult'
                    },
                    {
                        replace: 'ThySegmentItemComponent',
                        replaceWith: 'ThySegmentItem'
                    },
                    {
                        replace: 'ThySegmentComponent',
                        replaceWith: 'ThySegment'
                    },
                    {
                        replace: 'ThySelectComponent',
                        replaceWith: 'ThyNativeSelect'
                    },
                    {
                        replace: 'ThySkeletonCircleComponent',
                        replaceWith: 'ThySkeletonCircle'
                    },
                    {
                        replace: 'ThySkeletonRectangleComponent',
                        replaceWith: 'ThySkeletonRectangle'
                    },
                    {
                        replace: 'ThySkeletonComponent',
                        replaceWith: 'ThySkeleton'
                    },
                    {
                        replace: 'ThySlideContainerComponent',
                        replaceWith: 'ThySlideContainer'
                    },
                    {
                        replace: 'ThySliderComponent',
                        replaceWith: 'ThySlider'
                    },
                    {
                        replace: 'ThySpaceComponent',
                        replaceWith: 'ThySpace'
                    },
                    {
                        replace: 'ThyStatisticComponent',
                        replaceWith: 'ThyStatistic'
                    },
                    {
                        replace: 'ThyStepHeaderComponent',
                        replaceWith: 'ThyStepHeader'
                    },
                    {
                        replace: 'ThyStepComponent',
                        replaceWith: 'ThyStep'
                    },
                    {
                        replace: 'ThyStepperComponent',
                        replaceWith: 'ThyStepper'
                    },
                    {
                        replace: 'ThyStrengthComponent',
                        replaceWith: 'ThyStrength'
                    },
                    {
                        replace: 'ThySwitchComponent',
                        replaceWith: 'ThySwitch'
                    },
                    {
                        replace: 'ThyTableSkeletonComponent',
                        replaceWith: 'ThyTableSkeleton'
                    },
                    {
                        replace: 'ThyTableComponent',
                        replaceWith: 'ThyTable'
                    },
                    {
                        replace: 'ThyTabContentComponent',
                        replaceWith: 'ThyTabContent'
                    },
                    {
                        replace: 'ThyTabComponent',
                        replaceWith: 'ThyTab'
                    },
                    {
                        replace: 'ThyTabsComponent',
                        replaceWith: 'ThyTabs'
                    },
                    {
                        replace: 'ThyTagComponent',
                        replaceWith: 'ThyTag'
                    },
                    {
                        replace: 'ThyTagsComponent',
                        replaceWith: 'ThyTags'
                    },
                    {
                        replace: 'ThyTimePanelComponent',
                        replaceWith: 'ThyTimePanel'
                    },
                    {
                        replace: 'ThyTimePickerComponent',
                        replaceWith: 'ThyTimePicker'
                    },
                    {
                        replace: 'ThyTimelineItemComponent',
                        replaceWith: 'ThyTimelineItem'
                    },
                    {
                        replace: 'ThyTimelineComponent',
                        replaceWith: 'ThyTimeline'
                    },
                    {
                        replace: 'ThyTooltipComponent',
                        replaceWith: 'ThyTooltip'
                    },
                    {
                        replace: 'ThyTransferListComponent',
                        replaceWith: 'ThyTransferList'
                    },
                    {
                        replace: 'ThyTransferComponent',
                        replaceWith: 'ThyTransfer'
                    },
                    {
                        replace: 'ThyTreeComponent',
                        replaceWith: 'ThyTree'
                    },
                    {
                        replace: 'ThyTreeSelectComponent',
                        replaceWith: 'ThyTreeSelect'
                    },
                    {
                        replace: 'ThyTreeSelectNodesComponent',
                        replaceWith: 'ThyTreeSelectNodes'
                    },
                    {
                        replace: 'ThyFileSelectComponent',
                        replaceWith: 'ThyFileSelect'
                    },
                    {
                        replace: 'ThyVoteComponent',
                        replaceWith: 'ThyVote'
                    },
                    {
                        replace: 'ThyAutocompleteContainerComponent',
                        replaceWith: 'ThyAutocompleteContainer'
                    },
                    {
                        replace: 'ThyAvatarListComponent',
                        replaceWith: 'ThyAvatarList'
                    },
                    {
                        replace: 'OptionalDateRangesComponent',
                        replaceWith: 'OptionalDateRanges'
                    },
                    {
                        replace: 'DialogBodyComponent',
                        replaceWith: 'DialogBody'
                    },
                    {
                        replace: 'ThyConfirmComponent',
                        replaceWith: 'ThyConfirm'
                    },
                    {
                        replace: 'DialogFooterComponent',
                        replaceWith: 'DialogFooter'
                    },
                    {
                        replace: 'DialogHeaderComponent',
                        replaceWith: 'DialogHeader'
                    },
                    {
                        replace: 'ThyFormGroupErrorComponent',
                        replaceWith: 'ThyFormGroupError'
                    },
                    {
                        replace: 'ThyFormGroupFooterComponent',
                        replaceWith: 'ThyFormGroupFooter'
                    },
                    {
                        replace: 'ThyGuiderHintComponent',
                        replaceWith: 'ThyGuiderHint'
                    },
                    {
                        replace: 'ThyImagePreviewComponent',
                        replaceWith: 'ThyImagePreview'
                    },
                    {
                        replace: 'ThySelectionListComponent',
                        replaceWith: 'ThySelectionList'
                    },
                    {
                        replace: 'ThyMentionSuggestionsComponent',
                        replaceWith: 'ThyMentionSuggestions'
                    },
                    {
                        replace: 'ThyMenuDividerComponent',
                        replaceWith: 'ThyMenuDivider'
                    },
                    {
                        replace: 'ThyMenuGroupComponent',
                        replaceWith: 'ThyMenuGroup'
                    },
                    {
                        replace: 'ThyMenuItemComponent',
                        replaceWith: 'ThyMenuItem'
                    },
                    {
                        replace: 'ThyIconNavLinkComponent',
                        replaceWith: 'ThyIconNavLink'
                    },
                    {
                        replace: 'ThyIconNavComponent',
                        replaceWith: 'ThyIconNav'
                    },
                    {
                        replace: 'ThyPopoverBodyComponent',
                        replaceWith: 'ThyPopoverBody'
                    },
                    {
                        replace: 'ThyPopoverHeaderComponent',
                        replaceWith: 'ThyPopoverHeader'
                    },
                    {
                        replace: 'ThyPropertyOperationGroupComponent',
                        replaceWith: 'ThyPropertyOperationGroup'
                    },
                    {
                        replace: 'ThyRadioButtonComponent',
                        replaceWith: 'ThyRadioButton'
                    },
                    {
                        replace: 'ThyRadioGroupComponent',
                        replaceWith: 'ThyRadioGroup'
                    },
                    {
                        replace: 'ThySelectCustomComponent',
                        replaceWith: 'ThySelect'
                    },
                    {
                        replace: 'ThyOptionGroupComponent',
                        replaceWith: 'ThyOptionGroup'
                    },
                    {
                        replace: 'ThyOptionComponent',
                        replaceWith: 'ThyOption'
                    },
                    {
                        replace: 'ThyOptionsContainerComponent',
                        replaceWith: 'ThyOptionsContainer'
                    },
                    {
                        replace: 'ThySkeletonBulletListComponent',
                        replaceWith: 'ThySkeletonBulletList'
                    },
                    {
                        replace: 'ThySkeletonListComponent',
                        replaceWith: 'ThySkeletonList'
                    },
                    {
                        replace: 'ThySkeletonParagraphComponent',
                        replaceWith: 'ThySkeletonParagraph'
                    },
                    {
                        replace: 'ThySlideBodySectionComponent',
                        replaceWith: 'ThySlideBodySection'
                    },
                    {
                        replace: 'ThySlideBodyComponent',
                        replaceWith: 'ThySlideBody'
                    },
                    {
                        replace: 'ThySlideFooterComponent',
                        replaceWith: 'ThySlideFooter'
                    },
                    {
                        replace: 'ThySlideHeaderComponent',
                        replaceWith: 'ThySlideHeader'
                    },
                    {
                        replace: 'ThySlideLayoutComponent',
                        replaceWith: 'ThySlideLayout'
                    },
                    {
                        replace: 'ThyInnerTimePickerComponent',
                        replaceWith: 'ThyInnerTimePicker'
                    },
                    {
                        replace: 'ThyTextComponent',
                        replaceWith: 'ThyText'
                    },
                    {
                        replace: 'ThyAlphaComponent',
                        replaceWith: 'ThyAlpha'
                    },
                    {
                        replace: 'ThyHueComponent',
                        replaceWith: 'ThyHue'
                    },
                    {
                        replace: 'ThyIndicatorComponent',
                        replaceWith: 'ThyIndicator'
                    },
                    {
                        replace: 'ThyColorInputsComponent',
                        replaceWith: 'ThyColorInputs'
                    },
                    {
                        replace: 'ThySaturationComponent',
                        replaceWith: 'ThySaturation'
                    },
                    {
                        replace: 'CalendarFooterComponent',
                        replaceWith: 'CalendarFooter'
                    },
                    {
                        replace: 'DateHeaderComponent',
                        replaceWith: 'DateHeader'
                    },
                    {
                        replace: 'DateTableCellComponent',
                        replaceWith: 'DateTableCell'
                    },
                    {
                        replace: 'DateTableComponent',
                        replaceWith: 'DateTable'
                    },
                    {
                        replace: 'DateCarouselComponent',
                        replaceWith: 'DateCarousel'
                    },
                    {
                        replace: 'DecadeHeaderComponent',
                        replaceWith: 'DecadeHeader'
                    },
                    {
                        replace: 'DecadeTableComponent',
                        replaceWith: 'DecadeTable'
                    },
                    {
                        replace: 'MonthHeaderComponent',
                        replaceWith: 'MonthHeader'
                    },
                    {
                        replace: 'MonthTableComponent',
                        replaceWith: 'MonthTable'
                    },
                    {
                        replace: 'DatePopupComponent',
                        replaceWith: 'DatePopup'
                    },
                    {
                        replace: 'InnerPopupComponent',
                        replaceWith: 'InnerPopup'
                    },
                    {
                        replace: 'QuarterTableComponent',
                        replaceWith: 'QuarterTable'
                    },
                    {
                        replace: 'YearHeaderComponent',
                        replaceWith: 'YearHeader'
                    },
                    {
                        replace: 'YearTableComponent',
                        replaceWith: 'YearTable'
                    },
                    {
                        replace: 'ThyMenuItemActionComponent',
                        replaceWith: 'ThyMenuItemAction'
                    },
                    {
                        replace: 'ThyMenuItemIconComponent',
                        replaceWith: 'ThyMenuItemIcon'
                    },
                    {
                        replace: 'ThyMenuItemNameComponent',
                        replaceWith: 'ThyMenuItemName'
                    },
                    {
                        replace: 'ThySelectOptionGroupComponent',
                        replaceWith: 'ThySelectOptionGroup'
                    },
                    {
                        replace: 'ThyListOptionComponent',
                        replaceWith: 'ThyListOption'
                    },
                    {
                        replace: 'ThySelectControlComponent',
                        replaceWith: 'ThySelectControl'
                    },
                    {
                        replace: 'ThyCustomSelectTriggerType',
                        replaceWith: 'ThySelectTriggerType'
                    }
                ]
            }
        ]
    },
    elementSelectors: {
        [TargetVersion.V17]: [
            {
                pr: '',
                changes: [
                    {
                        replace: '<thy-select>',
                        replaceWith: '<thy-native-select>'
                    },
                    {
                        replace: '<thy-select ',
                        replaceWith: '<thy-native-select '
                    },
                    {
                        replace: '<thy-select\n',
                        replaceWith: '<thy-native-select\n'
                    },
                    {
                        replace: '</thy-select>',
                        replaceWith: '</thy-native-select>'
                    },
                    {
                        replace: '<thy-custom-select>',
                        replaceWith: '<thy-select>'
                    },
                    {
                        replace: '<thy-custom-select\n',
                        replaceWith: '<thy-select\n'
                    },
                    {
                        replace: '<thy-custom-select ',
                        replaceWith: '<thy-select '
                    },
                    {
                        replace: '</thy-custom-select>',
                        replaceWith: '</thy-select>'
                    }
                ]
            }
        ]
    },
    attributeSelectors: {},
    constructorChecks: {},
    cssSelectors: {},
    inputNames: {},
    methodCallChecks: {},
    outputNames: {},
    propertyNames: {},
    symbolRemoval: {}
};
