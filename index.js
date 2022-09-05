// http://html5.cyberlab.info/elements/forms/textarea-placeholder.html
function convertForTool(moji) {
    // JSON(コマンド)をHTML(minecraft.tools用)に変換する
    let data
    try {
        data = JSON.parse(moji)
    } catch (error) {
        alert("コマンドのjsonが不正です。" + moji + error)
        return
    }
    if (!Array.isArray(data)) {
        data = [data]
    }

    // 変換表
    let colorMap = {
        "black": "#000000",
        "dark_blue": "#0000AA",
        "dark_green": "#00AA00",
        "dark_aqua": "#00AAAA",
        "dark_red": "#AA0000",
        "dark_purple": "#AA00AA",
        "gold": "#FFAA00",
        "gray": "#AAAAAA",
        "dark_gray": "#555555",
        "blue": "#5555FF",
        "green": "#55FF55",
        "aqua": "#55FFFF",
        "red": "#FF5555",
        "light_purple": "#ff55ff",
        "yellow": "#FFFF55",
        "white": "#FFFFFF",

    }

    // 変換
    let result = ""
    for (let aa of data) {
        //alert(JSON.stringify(aa));


        if (aa === "") {
            continue
        }

        let text = aa.text
        //alert(aa.color)
        if (undefined !== aa.color) {
            text = `<span style="color:${colorMap[aa.color]};">${text}</span>`
        }
        if (undefined !== aa.clickEvent) {
            if (aa.clickEvent.action == 'open_url') {
                //result += aa.clickEvent
                //text += JSON.stringify(aa.clickEvent)
                let value = aa.clickEvent.value
                text = `<a data-openurl="${value}" class="openurl" href="${value}">${text}</a>`
            } else if (aa.clickEvent.action == 'run_command') {
                let value = aa.clickEvent.value
                text = `<a data-runcommand="${value}" class="runcommand" href="${value}">${text}</a>`
            }

        }
        if (undefined !== aa.underlined) {
            // 文字 → <u>文字</u> に変換する
            text = `<u>${text}</u>`
            //@とシフトで出る　‘‘
        }
        if (undefined !== aa.bold) {
            text = `<strong>${text}</strong>`
        }
        if (undefined !== aa.italic) {
            text = `<em>${text}</em>`
        }
        if (undefined !== aa.strikethrough) {
            text = `<s>${text}</s>`
        }
        if (undefined !== aa.obfuscated) {
            text = `<span class="obfuscated">${text}</span>`
        }
        if (undefined !== aa.score) {
            // 文字 → <u>文字</u> に変換する
            let name = aa.score.name
            let objective = aa.score.objective
            text = `<code class="scoreboard" data-player="${name}" data-objective="${objective}" data-scoreboard="${name}§§${objective}">${name}->${objective}</code>`
            //@とシフトで出る　‘‘
        }
        if (undefined !== aa.selector) {
            // 文字 → <u>文字</u> に変換する
            let selector = aa.selector
            text = `<code class="selector">${selector}</code>`
            //@とシフトで出る　‘‘
        }

        result += text
    }
    return result
}

// ↓ jQuery イベントで検索
$('#test3').on('click', event => {
    let tellrawText
    let titleText
    let subtitleText
    //event.target
    //alert($(event.target).text())
    let moji = $('#test2').val()
    const mojis = moji.split(/\n/);
    for (const mojiLine of mojis) {
        const re = /\/(tellraw @[arpes](?:\[.+\])?|title @[arpes](?:\[.+\])? (title|subtitle|actionbar)) (.+)/
        let matchresult = mojiLine.match(re)

        if (matchresult === null) {
            alert("コマンドではありません")
            return
        }
        moji = matchresult[3]
        let is_tellraw = matchresult[1].startsWith("tellraw")
        let is_subtitle = matchresult[2] !== undefined && matchresult[2].startsWith("subtitle")
        let result = convertForTool(moji)
        if (is_tellraw) {
            tellrawText = result
        } else if (is_subtitle) {
            subtitleText = result
        } else {
            titleText = result
        }
    }


    // データをJSONに変換 (デバッグ用)
    //moji = JSON.stringify(s)

    // 出力欄に反映
    //$('#test1').val(result)

    if (titleText) {
        // 実行ボタンを押すと送信されるようにした。
        $('#title_text').val(titleText)
        $('#subtitle_text').val(subtitleText)
        $('#title').submit()
    } else {
        // 実行ボタンを押すと送信されるようにした。
        $('#tellraw_text').val(tellrawText)
        $('#tellraw').submit()
    }



})