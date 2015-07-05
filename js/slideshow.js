//slideshow.js

//Slide Data grouped in array, each element is a JSON object with two attributes: title and text
var slides_data = [
  {
    image_url: "",
    title: "Our model: Problems first, products second",
    text: "<p>We've got a crazy idea; that we can solve the world's problems by gathering leading experts around a problem, then figuring out how to solve it, from the data up. We don't sell a specific product or service. We seek opportunities within the fabric of the problem solving process. </p>",
    quote: ""
  },
  {
    image_url: "",
    title: "The process",
    text: "<p>We solve problems from a data driven ideology. We are obsessed by changing real world metrics <em>that matter</em> like 'parts per million' or 'kilograms per person', instead of being driven by conventional business metrics like 'clicks', 'users' or 'market share'. </p><p>The data, or metrication of the problem is always king.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Data first",
    text: "<p><em>&ldquo;You can achieve amazing progress if you set a clear goal and find a measure that will drive progress toward that goal. This may seem pretty basic, but it is amazing to me how often it is not done and how hard it is to get right.&rdquo;</em> - Bill Gates, Annual address 2013</p><p>The first step in solving a problem is to understand it deeply. We start every solution by capturing the data as real-time as possible.</p>",
    quote: "<p><em>&ldquo;Merely measuring something has an uncanny tendency to improve it.&rdquo;</em><br/>Paul Graham, YC</p>"
  },
  {
    image_url: "",
    title: "Goals as real world metrics",
    text: "<p>All journeys need a destination. The next step is to create a quantitative goal. The goal is developed from a meaningful metric that most clearly indicates the problem is 'solved'. Meanigful metrics might be goals such as 'to reduce waste to 100 kg per person per year' or 'reduce gasoline useage to 50 gallons per year'. </p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Visualize the future ",
    text: "<p><em>&ldquo;If you want to build a ship, don't drum up people to collect wood and don't assign them tasks and work, but rather teach them to long for the endless immensity of the sea.&rdquo;</em><br/>Antoine de Saint Exupéry, writer and aviator.</p><p>The secret ingedient of great leaders is vision. What will the world look like when this problem is solved? How will it work? What systems will it use? How beautiful could it be? We illustrate how this world will look, function and feel. The visualization becomes the guiding star that inspired the journey of change.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Idea storming",
    text: "<p>How do we get from <em>here</em> to </em>there</em>? Once the data is collected and the metric goal is established. We use the data (where we are now) and vizualisation (where we want to go) as the primary compass.</p><p>This is where we unleash our imagination to brainstorm a couldron of ideas solve the problem.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Idea evaluation",
    text: "<p>Which ideas should we pursue? We map all potentential ideas on a scale of 'ease to implement' versus 'effectiveness on the goal'. Once the ideas are mapped, we can chose the ideas to pursue that are the most <em>effective</em> and the easiest to implement.</p><p>An idea is only as valuable as it's effect on the problem's data.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Policy design",
    text: "<p>A problem usually requires government policy in order to reach its full potential for getting solved. We map out which policies would be most effective at solving the problem and what style of campaign is needed to have the highest potential of the policy being approved into law.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Behavioural change",
    text: "<p>Once we have the data, we can isolate what bahaviours need to be created, removed or enhanced in order to acheive the goal and then develop behavioiural change programs. The feedback of the data back to people is an essential component in motivating real change.<p/>",
    quote: ""
  },
  {
    image_url: "",
    title: "Game design",
    text: "<p>Saving the world should be fun, right? We implement game and motivational design features into the project to encourage the key behaviours that need to be changed to successfully solve the problem. Adding social competition and emotional rewards truly ignites the process of change.<p/>",
    quote: ""
  },
  {
    image_url: "",
    title: "Tribes & evangelists",
    text: "<p>All change is driven by powerful cultural movements. But all ideologies were once created. We use branding, media and social marketing to build passionately motivated tribes and evangelists who drive waves of change through their communities.</p>",
    quote: ""
  },
  {
    image_url: "",
    title: "Technology",
    text: "<p>Once the problem has been thouroughly assesed, we can determine what technology projects can be created  to facilitate the acheivement of the goal.</p><p>We create apps, games, data APIs and websites that the community needs to hardness the drive we all have to solve the world's greatest problems - and make it fun.</p>",
    quote: ""
  }
];




//Initialize the slideshow on page ready
$(document).ready(function(){
  //initialize the slideshow
  slideshow.init();
  //set a watcher on the url
  $(window).bind('hashchange', function(){
    slideshow.init();
  });
});




//slideshow object
var slideshow = {

  //DATA MEMBERS

  current_url: document.URL,
  url_slide_num: 0,


  //METHODS

  init: function(){
    //evaluate the url looking for #num which is the current slide
    slideshow.eval_url();
    slideshow.bind_slide_nav();
    slideshow.show_highlight();
    slideshow.show_prev_button();
    slideshow.show_next_button();
    slideshow.show_slide(slideshow.url_slide_num);

  },

  eval_url: function(){
    var url_slide = "";
    var url  = document.createElement('a');
    url.href = document.URL;
    if(url.hash != "" && url.hash != null)
    {
      url_slide = url.hash;
    }

    //figure out which slide to display
    switch(url_slide)
    {
      case "#our-model":
        slideshow.url_slide_num = 0;
        break;
      case "#the-process":
        slideshow.url_slide_num = 1;
        break;
      case "#data":
        slideshow.url_slide_num = 2;
        break;
      case "#goals":
        slideshow.url_slide_num = 3;
        break;
      case "#visualize":
        slideshow.url_slide_num = 4;
        break;
      case "#idea-storming":
        slideshow.url_slide_num = 5;
        break;
      case "#idea-assessment":
        slideshow.url_slide_num = 6;
        break;
      case "#policy-design":
        slideshow.url_slide_num = 7;
        break;
      case "#behavioral-change":
        slideshow.url_slide_num = 8;
        break;
      case "#game-design":
        slideshow.url_slide_num = 9;
        break;
      case "#tribes-and-evangelists":
        slideshow.url_slide_num = 10;
        break;
      case "#technology":
        slideshow.url_slide_num = 11;
        break;
      default:
        //What do you want to do when the slide number cannot be determined?
        break;
    }
  },  

  bind_slide_nav: function()
  {
    var links = $(".slide-link");
    links.on("click", slideshow.init);
  },

  prev_animation: function() {
    var s = $(".slides-container");
    if(s != null && s != typeof 'undefined' && s.length > 0)
    {
      //TODO: make the buffer value dynamically detect the space between edge of slide
      // -show container???
      var buffer = 500;

      //CRITICAL: first apply the class that makes it possible to move a div!
      var w = s.css("width"); //get the div width;
      w = parseInt(w.replace("px", "")); //strip off the "px" at the end of the width;
      w += buffer; //add the buffer since the slideshow div doesn't take up all the space
      w += "px"; //append the unit measurement

      s.attr("style", ""); //Clear the style attribute on the element
      s.addClass("relative"); //make the element position relative so that it can be moved
      s.animate({ "left": "+="+w }, "slow", 'swing', function(){
        //first: reposition to the right, to animate in
        s.css("left", "-"+w); 

        //don't decrement the slide if at the beginning of the array
        if(slideshow.url_slide_num - 1 >= 0)
          slideshow.url_slide_num--; //decrement the slide number

        //determine to show the previous button or not
        slideshow.show_prev_button();
        slideshow.show_next_button();
        slideshow.show_highlight(); //paint the right link as highlighted

        //swap the content for the next slide
        //===================================
        s.html(''); //empty the slide container
        slideshow.show_slide(slideshow.url_slide_num); // swap the content for the new slide
        s.animate({ "left": "+="+w }, "slow", "swing", function(){
          s.removeClass('relative');//remove the relative positioning to make it static again
          slideshow.clear_all_link_highlights(); // clear all link highlights
          slideshow.show_highlight(); //paint the right link as highlighted
        });       

      });
    }
  },

  next_animation: function() {
    var s = $(".slides-container");
    if(s != null && s != typeof 'undefined' && s.length > 0)
    {
      //TODO: dynamically set the buffer value to left/right margin?
      var buffer = 500;

      var w = s.css("width"); //get the div width;
      w = parseInt(w.replace("px", "")); //strip off the "px" at the end of the width;
      w += buffer;//add the buffer since the div isn't as wide as page
      w += "px"; //append the unit of measurement

      s.attr("style", "");//clear the style attribute from the element

      //CRITICAL STEP: first apply the class that makes it possible to move a div!
      s.addClass("relative");//position relative so we can move the div
      s.animate({ "right": "+="+w }, "slow", 'swing', function(){

        s.css("right", "-"+w); //reposition to the right, to animate in

        //don't increment the slide if at the end of the array
        if(slideshow.url_slide_num + 1 < slides_data.length)
          slideshow.url_slide_num++; //increment the slide number

        //determine to show the previous button or not
        slideshow.show_prev_button();
        slideshow.show_next_button();
        slideshow.show_highlight(); //paint the right link as highlighted

        //swap the content for the next slide
        //===================================
        s.html(''); //empty the slide container
        slideshow.show_slide(slideshow.url_slide_num); // swap the content for the new slide
        s.animate({ "right": "+="+w }, "slow", "swing", function(){
          s.removeClass('relative');//remove the relative positioning to make it static again

        });       
      });
    }
    else
    {
      console.log("failed to get a reference to the slides container");
    }
  },

  show_slide: function(index)
  {
    //print the slide to the slides-container div
    var slides = $(".slides-container");
    if(slides != null && slides != typeof 'undefined' && slides.length > 0)
    {
      //clear the slides div
      slides.html('');
      var image = slides_data[index].image_url,
      title = slides_data[index].title,
      text = slides_data[index].text,
      quote = slides_data[index].quote,
      output = '';
      //output to html
      output += '<div class="slides-title">'+title+'</div>';
      output += '<div class="slides-image"><img alt="" src="'+image+'" /></div>';
      output += '<div class="slides-text">'+text+'</div>';
      output += '<div class="slides-quote">'+quote+'</div>';    
      slides.html(output);
    }
  },

  show_prev_button: function()
  {
    var prev = $(".previous"); //get a reference to the next button just in case...
    var max = slides_data.length;

    //if we are not at the beginning of the array hide the button
    if(slideshow.url_slide_num-1 < 0 ||
       slideshow.url_slide_num == 0)
    {
      prev.addClass("hidden"); //hide the next button
    }
    else
    {
      prev.removeClass("hidden"); //show the next button
    }
  },

  show_next_button: function()
  {
    var next = $(".next"); //get a reference to the next button just in case...
    var max = slides_data.length;

    //if we are not at the end of the array hide the button
    if(slideshow.url_slide_num+1 >= max ||
       slideshow.url_slide_num == max)
    {
      next.addClass("hidden"); //hide the next button
    }
    else
    {
      next.removeClass("hidden"); //show the next button
    }
  },

  show_highlight: function()
  {
    slideshow.clear_all_link_highlights(); // clear all link highlights
    var slide_num = parseInt(slideshow.url_slide_num);
    var link = $("#link" + slide_num);
    link.addClass("footer-link-highlight");
  },

  clear_all_link_highlights: function()
  {
    $(".slide-link").removeClass('footer-link-highlight');
  }

} //end slideshow object