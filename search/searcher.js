let SearchResult = '[{"title": "\u6b66\u5668", "path": "html/weapon/\u6b66\u5668.html", "text": ""}, {"title": "\u5de5\u5177", "path": "html/tool/\u5de5\u5177.html", "text": ""}, {"title": "\u4e8b\u4ef6\u4e0e\u6311\u6218", "path": "html/incident/\u4e8b\u4ef6\u4e0e\u6311\u6218.html", "text": ""}, {"title": "\u5165\u95e8", "path": "html/getting started/\u5165\u95e8.html", "text": ""}, {"title": "\u751f\u7269", "path": "html/biology/\u751f\u7269.html", "text": ""}, {"title": "\u7269\u54c1", "path": "html/articles/\u7269\u54c1.html", "text": "\u7269\u54c1"}, {"title": "\u5408\u6210\u5668\u68b0", "path": "html/apparatus/\u5408\u6210\u5668\u68b0.html", "text": ""}]';
obj = JSON.parse(SearchResult);

function check() {
  return false;
}

function maxfor(arr) {
  var len = arr.length;
  var max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}
let input = document.getElementById("input");
let result = document.getElementById("resultlist");
// let infos = document.getElementById('info')
let button = document.getElementById("searchbutton");
input.addEventListener("focus", (e) => {
  result.id = "active";
  result.style.overflow = "auto";
  result.style.padding = "3px";
  // infos.id = 'hidden'
});
input.addEventListener("blur", (e) => {
  result.id = "resultlist";
  result.style.overflow = "hidden";
  result.style.padding = "0";
  // infos.id = 'info'
});

function searchtext() {
  result.innerHTML = input.value;
  if (input.value == "") {
    result.innerHTML =
      "<p>- 搜索 -</p><hr>" + '<p align="center">等待搜索中...</p><hr>';
  }

  // 标题搜索
  resultcount = 0;
  resultstr = "";
  var resulttitlecache = new Array();
  for (i = 0; i < obj.length; i++) {
    if (obj[i]["title"].includes(input.value) == true) {
      resulttitlecache.unshift(obj[i]["title"]);
      resultcount++;
    }
  }

  // 标题搜索结果展示
  if (resultcount !== 0 && resultcount !== obj.length) {
    for (i = 0; i < resulttitlecache.length; i++) {
      for (j = 0; j < obj.length; j++) {
        if (obj[j]["title"] == resulttitlecache[i]) {
          titlesearchresult =
            '<h4><a href="' +
            obj[j]["path"] +
            '" class="resulttitle">' +
            obj[j]["title"].replace(
              new RegExp(input.value, "g"),
              "<mark>" + input.value + "</mark>"
            ) +
            '</a></h4><em>-标题匹配</em><p class="showbox">' +
            obj[j]["text"].substring(0, 100) +
            "</p>";
          resultstr = titlesearchresult + "<hr>" + resultstr;
        }
      }
      result.innerHTML = '<p>"' + input.value + '"</p><hr>' + resultstr;
    }
  }

  // 正文搜索
  var resulttextcache = new Array();
  for (i = 0; i < obj.length; i++) {
    if (obj[i]["text"].includes(input.value) == true) {
      resulttextcache.unshift(obj[i]["text"]);
      resultcount++;
    }
  }

  // 正文搜索结果计数
  var targetname = new Array();
  var targetscore = new Array();
  if (resulttextcache.length !== 0 && input.value !== "") {
    for (i = 0; i < resulttextcache.length; i++) {
      for (j = 0; j < obj.length; j++) {
        if (obj[j]["text"] == resulttextcache[i]) {
          targetname.unshift(obj[j]["title"]);
          targetscore.unshift(
            obj[j]["text"].match(RegExp(input.value, "gim")).length
          );
        }
      }
    }
  }

  //排序相关选项
  var targetscorecache = targetscore.concat([]);
  var resultfortext = "";
  var textsearchresult = "";
  targetscorecache.sort(function (a, b) {
    return b - a;
  });
  for (i = 0; i < targetscorecache.length; i++) {
    for (j = 0; j < targetscore.length; j++) {
      if (targetscorecache[i] == targetscore[j]) {
        console.log("文章排序:" + targetname[j]);
        for (k = 0; k < obj.length; k++) {
          if (obj[k]["title"] == targetname[j]) {
            // 确认选区
            textorder = obj[k]["text"].indexOf(input.value) - 15;
            while (textorder < 0) {
              textorder++;
            }

            resultfortext =
              '<h4><a href="' +
              obj[k]["path"] +
              '" class="resulttitle">' +
              obj[k]["title"] +
              "</a></h4><em>-" +
              targetscorecache[i] +
              '个结果</em><p class="showbox">...' +
              obj[k]["text"]
                .substring(textorder, textorder + 100)
                .replace(
                  new RegExp(input.value, "g"),
                  "<mark>" + input.value + "</mark>"
                ) +
              "</p>";
            textsearchresult = textsearchresult + "<hr>" + resultfortext;
          }
        }
      }
    }
  }

  // 无效结果安排
  if (resultcount !== obj.length) {
    if (resultcount == 0) {
      result.innerHTML =
        '<p>"' + input.value + '"</p><hr><p align="center">没有找到结果</p>';
    }
  }
  // 整合
  result.innerHTML =
    result.innerHTML.substring(0, result.innerHTML.length - 4) +
    textsearchresult.substring(0, textsearchresult.length - 4) +
    '<hr><a href="https//github.com/reticenceji/StaticPageSearch" class="tr">搜索功能原作者Github项目</a>';
}
