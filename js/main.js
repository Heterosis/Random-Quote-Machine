function randomQuote() {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON(
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      function(q) {
        $("#text").html(q[0].content);
        $("#author").text(q[0].title);
        $("#tweet-quote").attr(
          "href",
          "https://twitter.com/intent/tweet?text=" +
          q[0].content.replace(/(<([^>]+)>)/gi, "") +
          " - " +
          q[0].title
        );
        $("#fb-quote").attr(
          "href",
          "https://www.facebook.com/sharer/sharer.php?u=" +
          window.location.href + "&quote=" +
          q[0].content.replace(/(<([^>]+)>)/gi, "") +
          " - " +
          q[0].title
        );
      }
    );
  }
  $(document).ready(function() {
    randomQuote();
    $("#new-quote").click(function() {
      randomQuote();
    });
  });