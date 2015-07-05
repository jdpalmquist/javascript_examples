/*js library*/

var lib = {

  initialize: function(){
    lib.url.read();
    lib.tabs.hide_all_tab_grids();
    lib.tabs.bind();

    var hashtag = lib.url.parsed.hash;
    if(hashtag != null && hashtag != "")
    {
      //hide all the tab-grids
      var tabs = $('.tab-grid');
      tabs.addClass('hidden');

      //show the requested tab-grid
      var tab_grid = $(hashtag);
      tab_grid.removeClass('hidden');
    } 
  },

  tabs: {
    bind: function()
    {
      $("#intro-tab").on("click", function(){lib.tabs.click("#intro-tab");});
      $("#code-tab").on("click", function(){lib.tabs.click("#code-tab");});
      $("#projects-tab").on("click", function(){lib.tabs.click("#projects-tab");});
      $("#eye-candy-tab").on("click", function(){lib.tabs.click("#eye-candy-tab");});
      $("#resume-cv-tab").on("click", function(){lib.tabs.click("#resume-cv-tab");});
    },

    click: function(id)
    {
      lib.tags.stop_tag_animation();
      lib.tabs.remove_all_tab_highlights();
      lib.tabs.hide_all_tab_grids();

      switch(id)
      {
        case "#intro-tab":
          lib.tabs.highlight_tab("#intro-tab");
          lib.tabs.show_tab_grid("#intro");
        break;        

        case "#code-tab":
          lib.tabs.highlight_tab("#code-tab");
          lib.tabs.show_tab_grid("#code");
        break;

        case "#projects-tab":
          lib.tabs.highlight_tab("#projects-tab");
          lib.tabs.show_tab_grid("#projects");
        break;

        case "#eye-candy-tab":
          lib.tabs.highlight_tab("#eye-candy-tab");
          lib.tabs.show_tab_grid("#eye-candy");
        break;

        case "#resume-cv-tab":
          lib.tabs.show_tag_cloud();
          lib.tabs.show_download_resume_link();
          lib.tags.animate();
          lib.tabs.highlight_tab("#resume-cv-tab");
          lib.tabs.show_tab_grid("#resume-cv");
        break;
      }
    },

    show_tag_cloud: function()
    {
      $("#tag_cloud").removeClass("hidden");
    },

    show_download_resume_link: function()
    {
      $("#download-resume-container").removeClass("hidden");
    },

    highlight_tab: function(id)
    {
      var tab = $(id);
      if(tab != null && tab != typeof 'undefined' && tab.length > 0)
        tab.parent().addClass("column_title_selected");
    },

    remove_all_tab_highlights: function()
    {
      $('.column_title').removeClass('column_title_selected');
    },

    show_tab_grid: function(id)
    {
      var tab_grid = $(id);
      if(tab_grid != null && tab_grid != typeof 'undefined' && tab_grid.length > 0)
        tab_grid.removeClass('hidden');
    },

    hide_all_tab_grids: function()
    {
      $('.tab-grid').addClass('hidden');
    }
  },

  tags: {
    allow_animate: false,
    tag: null,
    meta: [],

    animate: function()
    {
      lib.tags.allow_animate = true;
      //get the tags
      lib.tags.tag = $('.tag');
      
      //set initial position
      //offset from (0,0) in percentage
      var xMin = 5;
      var xMax = 70;
      var yMin = 5;
      var yMax = 70;

      //randomly assign a fade in timer value to each tag for a fade in trigger
      for(var i = 0; i < lib.tags.tag.length; i++)
      {
        
        lib.tags.meta[i] = 
        {
          x: Math.ceil((Math.random()*xMax)+xMin),
          s: Math.ceil((Math.random()*2200)+300),
          t: Math.ceil((Math.random()*5000)+2000)
        };

        $(lib.tags.tag[i]).css("color", "#0000bb");
        $(lib.tags.tag[i]).css("left", lib.tags.meta[i].x + "%");
        $(lib.tags.tag[i]).css("top", "-30px");
        $(lib.tags.tag[i]).css("z-index", lib.tags.meta[i].z);
        $(lib.tags.tag[i]).css("font-size", "15px");
      }

      //iterate through the tags and start the animation
      for(var i = 0; i < lib.tags.tag.length; i++)
      {
        lib.tags.animate_tag(i);
      }
      //fade the tag in to visibility while simultaneously scaling up the tag text size
      //once the tag reaches maximum scale, reverse the operation scaling back down while fading out
      //once tag fades out, repeat the process.
    },

    animate_tag: function(i)
    {
      setTimeout(function(){
        
        //offset from (0,0) in percentage
        var xMin = 5;
        var xMax = 80;
        var yMin = 5;
        var yMax = 80;
        
        $(lib.tags.tag[i]).animate(
            {
              top: "350px",
              left: (Math.ceil((Math.random()*10)+40)) + "%",
              color: "fff",
              zIndex: "50",
              fontSize: "25px"
            },
            {
              duration: lib.tags.meta[i].t,
              done: function(){
                $(this).css("top", "-30px");
                $(this).css("left", Math.ceil((Math.random()*xMax)+xMin) + "%");
                $(this).css("color", "#0000bb");
                $(this).css("z-index", "0");
                $(this).css("font-size", "15px");
                lib.tags.meta[i].t = Math.ceil((Math.random()*5000)+2000);
                if(lib.tags.allow_animate)
                  lib.tags.animate_tag(i);
              }
            }
          );
          
        }, lib.tags.meta[i].s);
    },

    stop_tag_animation: function()
    {
      lib.tags.allow_animate = false;
    }
  },

  url: {
    parsed: null,

    read: function(){
      //author: Martin Angelov
      //source: http://tutorialzine.com/2013/07/quick-tip-parse-urls/

      // The URL we want to parse
      var url = document.URL;

      // The magic: create a new anchor element, and set the URL as its href attribute.
      // Notice that I am accessing the DOM element inside the jQuery object with [0]:
      var a = $('<a>', { href:url } )[0];

      lib.url.parsed = {
        protocol:a.protocol,
        host:a.hostname,
        port:a.port,
        path:a.pathname,
        query:a.search,
        hash:a.hash,
        origin:a.origin /*not available in older IE versions*/
      };
    }
  }
};