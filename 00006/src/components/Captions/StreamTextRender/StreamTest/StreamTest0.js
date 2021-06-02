<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1;"/>
  <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no"/>
  <link type="text/css" rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <link type="text/css" rel="stylesheet" href="/style/slick.css"/>
  <link type="text/css" rel="stylesheet" href="/style/slick-theme.css"/>
  <link type="text/css" rel="stylesheet" href="/style/player-v2.css"/>
  <title>IHaveAam : Real Time Text</title>
</head>
<body id="mcp" style="">
<table>
<tbody>
<tr id="content">
  <td id="player-wrap">
    <div id="streamTextPlayer" role="main" style="direction: ltr; overflow: auto;">
    </div>
  </td>
  <td id="messenger-wrap">
  </td>
</tr>
</tbody>
</table>

  <script type="text/javascript" src="//code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/scripts/classList.min.js"></script>
<script type="text/javascript" src="/scripts/console-polyfill.min.js"></script>
<script type="text/javascript" src="/scripts/slick.min.js"></script>
<script type="text/javascript" src="/scripts/player-resize.js"> </script>
<script type="text/javascript" src="/scripts/streamtext-player-app.js?v=3"> </script>

<script type="text/javascript">
  function openTranscriptWindow() {
    window.open("/player/transcript?event=IHaveAam",
      "transcript",
      "location=0,resizable=1,scrollbars=1,titlebar=1");
  }

    document.addEventListener("DOMContentLoaded", function() {
            $("#tools").slick({ variableWidth: true, slidesToShow: 3, infinite: false, arrows: true }).show();

      wireupResizeEvent();

      function annotatorActive() {
        let addWidget = document.querySelector(".annotator-adder");
        return addWidget && addWidget.style.display !== "none";
      }

      let contentElement = document.querySelector("#streamTextPlayer");

      let settings = {
        eventName: 'IHaveAam',
        contentElement: contentElement,
        interval: parseFloat(1) * 1000,
        start: 0,
        allowLegalDisplay: false,
        language: "",
        accessToken: "",
        annotatorActive: annotatorActive,
        statusIndicator: true,
        parentId: "mcp",
        fontSize: '48px',
        fontFamily: 'Tahoma',
        foreColor: '#FFFFFF',
        backColor: null,
        spacing: null,
        noFooter: true,
        outline: false
      };

      document.streamTextPlayer = new window.StreamText(settings);
    });
</script>
<script>
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-9534401-1', 'auto');
  ga('send', 'pageview', { 'dimension1': 'demo', 'anonymizeIp': true});

</script>
</body>
</html>
