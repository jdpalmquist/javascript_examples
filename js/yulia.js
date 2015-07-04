/*
  
  @name: yulia.js
  @author: Jesse Palmquist 
  @version: 1.0
  @dependencies: jquery 1.8.3 or higher
  @description: simple collapsible menu system for vertical menus <ul>::<li>::<a>
  @license: Copyright (C) 2014 Jesse Palmquist
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

*/
function yulia(id)
{
  var menu, bb, ul;               //close all menu ul's
  menu = jQuery(id);              //main menu container
  bb = menu.find("ul");           //the top ul forms the visible backbone of the menu
  ul = bb.find("ul");             //find all nested ul's inside the backbone ul
  ul.addClass("hidden");          //hide the ul's nested inside the backbone ul
  bb.find("a").on("click", function (event){
    //find all the links in the menu and add an "onclick" event 
    var that, parent, contents;
    that = $(event.target);       //get and "objectify" the calling elem
    parent = that.parent();       //get a reference to the callers parent, a li elem, 
    contents = parent.has("ul");  //if it has a child ul elem...
    if(contents.length > 0)       //which determines if this is an end node in the menu map or not...
    {
      //if the link has a sibling ul elem, it is not an end node...
      event.preventDefault();     //prevent the hyper link from activating
      //toggle the visibility of the child ul element (sibling to the clicked link)
      if(parent.children("ul").hasClass("hidden"))
        parent.children("ul").removeClass("hidden");
      else
        parent.children("ul").addClass("hidden");
    }
  });//end onclick binding
}