function randomQuote() {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON(
      "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
      function(q) {
        $("#text").html(q[0].content.rendered);
        $("#author").text(q[0].title.rendered);
        $("#tweet-quote").attr(
          "href",
          "https://twitter.com/intent/tweet?text=" +
          q[0].content.rendered.replace(/(<([^>]+)>)/gi, "") +
          " - " +
          q[0].title.rendered
        );
        $("#fb-quote").attr(
          "href",
          "https://www.facebook.com/sharer/sharer.php?u=" +
          window.location.href + "&quote=" +
          q[0].content.rendered.replace(/(<([^>]+)>)/gi, "") +
          " - " +
          q[0].title.rendered
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