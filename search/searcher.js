let SearchResult = '[{"title": "\u6b66\u5668", "path": "search/html/weapon/\u6b66\u5668.html", "text": ""}, {"title": "\u5de5\u5177", "path": "search/html/tool/\u5de5\u5177.html", "text": ""}, {"title": "\u4e8b\u4ef6\u4e0e\u6311\u6218", "path": "search/html/incident/\u4e8b\u4ef6\u4e0e\u6311\u6218.html", "text": ""}, {"title": "\u5165\u95e8", "path": "search/html/getting started/\u5165\u95e8.html", "text": ""}, {"title": "\u751f\u7269", "path": "search/html/biology/\u751f\u7269.html", "text": ""}, {"title": "\u7269\u54c1", "path": "search/html/articles/\u7269\u54c1.html", "text": "\u7269\u54c1\u809d\u5e1d\u751f\u5b58\u7269\u54c1"}, {"title": "\u7269\u54c1", "path": "search/html/articles/block/block_0001.html", "text": "\u7f16\u53f70001"}, {"title": "\u5408\u6210\u5668\u68b0", "path": "search/html/apparatus/\u5408\u6210\u5668\u68b0.html", "text": ""}]';
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
    result.innerHTML = '<p align="center">等待搜索中...</p><hr>';
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
            '<h4><a target="_parent" href="' +
            obj[j]["path"] +
            '" class="resulttitle"><main class="searcher_m">' +
            obj[j]["title"].replace(
              new RegExp(input.value, "g"),
              "<mark>" + input.value + "</mark>"
            ) +
            '</a><p class="showbox">- 标题匹配<br>' +
            obj[j]["text"].substring(0, 100) +
            "</p></main>";
          resultstr = titlesearchresult + "" + resultstr;
        }
      }
      result.innerHTML =
        '<p style="margin: 10px 0px 0px 0px;">搜索:"' +
        input.value +
        '"</p>' +
        resultstr;
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
              '<h4><main class="searcher_m"><a target="_parent" href="' +
              obj[k]["path"] +
              '" class="resulttitle">' +
              obj[k]["title"] +
              '</a><p class="showbox">- ' +
              targetscorecache[i] +
              "个结果<br>..." +
              obj[k]["text"]
                .substring(textorder, textorder + 100)
                .replace(
                  new RegExp(input.value, "g"),
                  "<mark>" + input.value + "</mark>"
                ) +
              "</p></main></h4>>";
            textsearchresult = textsearchresult + "" + resultfortext;
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
    '<hr><a target="_parent" href="https//github.com/reticenceji/StaticPageSearch" class="showbox">搜索功能原作者Github项目</a>';
}
