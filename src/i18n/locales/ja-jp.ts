import { ThyLocaleType } from '../i18n';

export default {
    id: ThyLocaleType.jaJp,
    layout: {
        expand: '展開',
        collapse: '折りたたみ'
    },
    datePicker: {
        yearFormat: 'yyyy年',
        monthFormat: 'MMM',
        weekFormat: 'EEEEE',
        fullWeekFormat: 'EE',
        weekThFormat: 'yyyy-ww週',
        dateFormat: 'yyyy年MM月dd日',

        yearQuarterFormat: "yyyy-'Q'q",
        yearMonthFormat: 'yyyy-MM',

        yearText: '年',
        quarterText: '四半期',
        monthText: '月',
        week: '週',
        prefixWeek: '週',

        previousYear: '昨年',
        nextYear: '来年',
        previousMonth: '先月',
        nextMonth: '来月',

        today: '今日',
        tomorrow: '明日',
        nextWeek: '来週',
        lastSevenDays: '過去7日間',
        lastThirtyDays: '過去30日間',
        currentMonth: '今月',
        currentWeek: '今週',

        advance: '高度なオプション',
        custom: 'カスタム',

        startDate: '開始日',
        endDate: '終了日',

        setTime: '時間を設定',
        placeholder: '日付を選択',

        ok: '確認',
        clear: 'クリア'
    },
    dateRange: {
        custom: 'カスタム',
        currentWeek: '今週',
        currentMonth: '今月'
    },
    timePicker: {
        placeholder: '時間を選択',
        now: '現在',
        ok: 'もちろん'
    },
    calendar: {
        today: '今日',
        yearMonthFormat: 'yyyy年MM月'
    },
    autocomplete: {
        empty: 'まだデータはありません'
    },
    transfer: {
        maxLimit: '(上限{max}個)',
        maxLockLimit: 'ロック (上限{maxLock}個)',
        unlocked: 'ロック解除'
    },
    colorPicker: {
        defaultColor: 'デフォルトカラー',
        noFillColor: '塗りつぶしなし',
        recentUsedColor: '最近使用したカスタムカラー',
        customColor: 'カスタムカラー',
        none: 'なし'
    },
    strength: {
        highest: '最高',
        high: '高',
        medium: '中',
        low: '低'
    },
    guider: {
        skip: 'スキップ',
        prev: '前へ',
        next: '次へ',
        finish: '完了'
    },
    copy: {
        tips: 'クリックしてコピー',
        success: 'コピー成功',
        error: 'コピー失敗'
    },
    nav: {
        more: 'もっと見る'
    },
    dialog: {
        title: '削除の確認',
        ok: '確認',
        cancel: 'キャンセル'
    },
    select: {
        placeholder: '選択してください',
        empty: 'まだデータはありません'
    },
    treeSelect: {
        placeholder: '選択してください',
        empty: 'まだデータはありません'
    },
    cascader: {
        placeholder: '選択してください',
        empty: 'まだデータはありません'
    },
    pagination: {
        page: 'ページ',
        order: '第',
        total: '合計',
        totalCount: '合計 {total}',
        jumpTo: 'ジャンプ',
        firstPage: '最初のページ',
        lastPage: '最後のページ',
        defaultUnit: '条'
    },
    form: {
        required: 'この選択肢は空にできません',
        maxlength: 'この選択肢の入力値の長さは{maxlength}を超えてはいけません',
        minlength: 'この選択肢の入力値の長さは{minlength}未満ではいけません',
        uniqueCheck: '入力値はすでに存在します。再入力してください',
        email: 'メールアドレスの形式が正しくありません',
        confirm: '二回の入力が一致しません',
        pattern: 'この選択肢の入力形式が正しくありません',
        number: '数字を入力する必要があります',
        url: 'URL形式が正しくありません',
        max: 'この選択肢の入力値は{max}を超えてはいけません',
        min: 'この選択肢の入力値は{min}未満ではいけません'
    },
    empty: {
        noDataText: 'データはありません'
    },
    image: {
        zoomOut: '縮小',
        zoomIn: '拡大',
        originalSize: '元のサイズ',
        fitToScreen: '画面に合わせる',
        fullScreen: '全画面表示',
        spin: '回転',
        download: 'ダウンロード',
        viewOriginal: '元の画像を表示',
        copyLink: 'リンクをコピー',
        exitPreview: 'プレビューを終了',
        exitFullScreen: '全画面表示を終了',
        copySuccess: '画像のURLをコピーしました',
        copyError: '画像のURLをコピーできませんでした',
        prev: '前の画像',
        next: '次の画像'
    }
};
