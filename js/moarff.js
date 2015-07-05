//moarff.js

function moarff()
{
	var that = this;

	this.multi_apply = function (t, colors, parse_ws)
	{
		var char_count, color_count, chunk_length, chunks, start, end, result, text;

		text = t;

		if(parse_ws == true) //parse out whitespace? 
			while(text.search(" ") != -1)
				text = text.replace(" ", "");	

		//count the chars in the string
		char_count = text.length;
		
		//count the number of colors we are iterating through
		color_count = colors.length;

		//color_count minus one -- because the last color is what we finish with
		color_count--; //pass three colors, get two moarff apply() calls, pass 4 get 3, and so on...

		//calculate the length of each chunk of text to transition through
		chunk_length = 0;
		if(color_count != 0)
		{
			chunk_length = char_count / color_count;
		}
		
		//ready the text chunks array
		chunks = [];
		start = 0; 
		end = chunk_length;
		
		//Iterate through each color change 
		for(var j = 0; j < color_count; j++)
		{
			chunks[j] = null;
			//and build each chunk of text 
			for(var i = start; i < end && i < char_count; i++)
			{
				chunks[j] += text[i];
			}
			start += chunk_length;
			end += chunk_length;
		}
		
		//Build the multi output by calling apply() on each chunk
		result = null;
		chunk_count = chunks.length;
		start = 0;
		end = 1;
		for(var i = 0; i < chunk_count; i++)
		{
			if(isset(start) && isset(end))
				result += that.apply(chunks[i], colors[start], colors[end]);
			start++;
			end++;
		}
		return result;
	}

	this.apply = function (t, c1, c2, parse_ws)
	{	
		/*
		 * Algorithm
		 * ----------------------------------------------------------
		 1 - convert each hex value to decimal
		 2 - figure out the numeric distance between colors
		 3 - figure out the average each rgb value has to move per character
		 4 - add average color increments to current values
		 5 - convert values back to hexidecimal
		 6 - append css classes
		 * */
		
		//-----------------------------------------------------------------
		
		var result, max, color1, color2, avg, c, text;

		text = t;

		if(parse_ws == true) //parse out whitespace? 
			while(text.search(" ") != -1)
				text = text.replace(" ", "");	

		result = '';
		max = text.length;
		
		//Make sure we are not working with an empty string, as this will cause a "divide by zero" issue
		if(text != null && text != "")
		{
			//1. Convert Hexidecimal color codes to 3 separate values				
			color1 = new rgb();
			color2 = new rgb();
			color1.init_hex(c1); //initialize the rgb object using a hex value
			color2.init_hex(c2); //initialize the rgb object using a hex value

			//2. Calc Deltas				
			avg = that.delta(text, color1, color2);				
			
			//Initialize Color Variable
			c = new rgb();
			//3. Update 
			
			//Iterate through each each character in the string
			//Have to wrap each char with a span tag
			for(var i = 0; i < max; i++)
			{	
				//Find the increment for the color values
				if(i == 0)
				{
					//Starting Character, start with opening character, color starts with first parameter
					c.dec_update( 	
						color1.get_red(), 
						color1.get_green(),
						color1.get_blue()
					);
				}
				else 
				{
					//4. & 5. Add the Averages to increment the color to the next step
					var temp_red = (parseInt(c.get_red()) + parseInt(avg.get_red()));
					if(temp_red < 0 )
						temp_red = 0;
					var temp_grn = (parseInt(c.get_green() + avg.get_green()));
					if(temp_grn < 0 )
						temp_grn = 0;
					var temp_blu = (parseInt(c.get_blue() + avg.get_blue()));
					if(temp_blu < 0 )
						temp_blu = 0;

					c.dec_update(   
						temp_red,
						temp_grn,
						temp_blu
					);					
				}					
															
				//6. Save the Result
				result += '<span style="color:#' + c.get_hexcode() + ';">' + text[i] + '</span>';
			}

			return result;
		}
		else 
		{
			return false;
		}
	}

	this.delta = function(text, color1, color2)
	{
		//Count the number of characters
		max = text.length;

		//Figure out the numeric distance between colors
		delta = new rgb();
		delta.set_red(color2.get_red() - color1.get_red());
		delta.set_green(color2.get_green() - color1.get_green());
		delta.set_blue(color2.get_blue() - color1.get_blue());
		
		//Figure out the average distance each color value has to move for each given increment
		avg = new rgb();
		avg.set_red(delta.get_red() / max);
		avg.set_green(delta.get_green() / max);
		avg.set_blue(delta.get_blue() / max);
		
		return avg;
	}
}//end moarff js object 


function rgb()
{
	//object-self scope resolution -- "this" refers to the parent code scope, function, etc.
	var that = this;

	this.hexcode = "";
	this.r = "";
	this.g = "";
	this.b = "";
	
	//use this when you have a hexidecimal color code to start off with
	this.init_hex = function (hexcode)
	{
		that.hex2dec(hexcode);
	}	
	//use this when you have three decimal values for the color code to start off with
	this.init_dec = function (r, g, b)
	{
		that.dec2hex(r, g, b);
	}
	this.print_debug = function ()
	{
		var debug = "RGB OBJECT DEBUG OUTPUT:\n";
		debug +=    "========================\n\n\n";
		debug +=    "Hexcode = " + that.hexcode + "\n\n";
		debug +=    "Red = " + that.r + "\n\n";
		debug +=    "Green = " + that.g + "\n\n";
		debug +=    "Blue = " + that.b + "\n\n";
		alert(debug);
	}
	this.set_hexcode = function(hexcode){that.hexcode = hexcode;}
	this.set_red = function(r){that.r = r;}
	this.set_green = function(g){that.g = g;}
	this.set_blue = function(b){that.b = b;}
	this.get_hexcode = function(){return that.hexcode;}
	this.get_red = function(){return that.r;}
	this.get_green = function(){return that.g;}		
	this.get_blue = function(){return that.b;}
	this.hex_update = function(hexcode)
	{
		that.set_hexcode(hexcode);
		that.hex2dec(that.hexcode);
	}
	this.dec_update = function(r, g, b)
	{
		that.set_red(r);
		that.set_green(g);
		that.set_blue(b);
		that.dec2hex(that.r, that.g, that.b);
	}
	this.hex2dec = function(color)
	{
		var text, rhex, ghex, bhex;

		//strip hash marks if any
		that.set_hexcode(color.replace("#", ""));
		text = that.get_hexcode();

		//Split the HTML color code into three pieces
		rhex = text[0] + text[1];
		ghex = text[2] + text[3];
		bhex = text[4] + text[5];
		
		//Convert the hexidecimal color value to decimal
		that.r = that.toDec(rhex);
		that.g = that.toDec(ghex);
		that.b = that.toDec(bhex);
	}
	this.dec2hex = function (r, g, b)
	{
		that.r = r;
		that.g = g;
		that.b = b;

		//takes decimal input, returns hexidecimal output
		//Convert decimal rgb values back to HTML hexidecimal rgb values	
		var t = '';
		if(r >= 16)
		{
			t += that.toHex(that.r);
		}
		else 
		{
			t += '0' + that.toHex(that.r); //Note: needs testing
		}
		if(g >= 16)
		{
			t += that.toHex(that.g);
		}
		else 
		{
			t += '0' + that.toHex(that.g); //Note: needs testing
		}
		if(b >= 16)
		{
			t += that.toHex(that.b);
		}
		else 
		{
			t += '0' + that.toHex(that.b); //Note: needs testing
		}

		that.hexcode = t;
	}
	this.toHex = function(decimal)
	{
		return decimal.toString(16); //convert decimal to hexidecimal
	}	
	this.toDec = function(hexi)
	{
		return parseInt(hexi, 16); //convert hexidecimal to decimal
	}
	
}

//Helper function
function moarff_color(txt, color1, color2, target)
{
	var m = new moarff();
	var parse_out_whitespace = false;
	var result = m.apply(txt, color1, color2, parse_out_whitespace);
	var node = document.getElementById(target);
	if(node != null && node != typeof 'undefined')
	{
		node.innerHTML = '';
		node.innerHTML = result;
	}
}

function moarff_paint(max, classes, target)
{
	for(var i = 0; i < max; i++)
	{
		var m = new moarff();
		var parse_out_whitespace = true;
		var result = '<div class="'+classes+'">' + m.apply(random_str(1), random_color(), random_color(), parse_out_whitespace) + '</div>';

		var node = document.getElementById(target);
		if(node != null && node != typeof 'undefined')
		{
			node.innerHTML += result;
		}
	} 
}


/* Aierbazzi and Bagarozz fonts Examples using Moarff Javascript  */

//Fun with Aierbazzi
function make_foliage(txt, classes, color1, color2, target)
{
	//test strings
	//=============
	//$a = "abcdefghijklmnopqrstuvwxyz"; //Caps or lower case, doesn't matter
	//$b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//$c = "!@#$%^&*()_+---=[]\{}|;':",./<>?`~";  //Not Recognized by Aierbazzi or Bagarozz
	//$d = "1234567890";  //Not Recognized by Aierbazzi or Bagarozz
	
	//***CRITICAL NOTE!!!: 
	//The &nbsp; span element is a critical component of this equation:
	//In order to avoid explicit text sizes I had to create a hack to get the Aierbazzi/Bagarozz fonts to work
	// -- Aierbazzi or Bagarozz won't display unless it has a &nbsp; with a min font-size of 1px; otherwise the container collapses to zero
	// -- AierBazzi and Bagarozz are odd fonts -- the characters stack on top of one another instead of side by side like normal fonts

	var m = new moarff();
	var parse_out_whitespace = true;
	var result = '<div class="'+classes+'"><span style="font-size:1px;">&nbsp;</span>' + m.apply(txt, color1, color2, parse_out_whitespace) + '</div>';

	var node = document.getElementById(target);
	if(node != null && node != typeof 'undefined')
	{
		node.innerHTML = '';
		node.innerHTML = result;
	}
}
		
//Fun with Bagarozz
function make_monster(txt, classes, color1, color2, target)
{
	//test strings
	//=============
	//$a = "abcdefghijklmnopqrstuvwxyz"; //Caps or lower case, doesn't matter
	//$b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//$c = "!@#$%^&*()_+---=[]\{}|;':",./<>?`~";  //Not Recognized by Aierbazzi or Bagarozz
	//$d = "1234567890";  //Not Recognized by Aierbazzi or Bagarozz
	
	//***CRITICAL NOTE!!!: 
	//The &nbsp; span element is a critical component of this equation:
	//In order to avoid explicit text sizes I had to create a hack to get the Aierbazzi/Bagarozz fonts to work
	// -- Aierbazzi or Bagarozz won't display unless it has a &nbsp; with a min font-size of 1px; otherwise the container collapses to zero
	// -- AierBazzi and Bagarozz are odd fonts -- the characters stack on top of one another instead of side by side like normal fonts

	var m = new moarff();
	var parse_out_whitespace = true;
	var result = '<div class="'+classes+'"><span style="font-size:1px;">&nbsp;</span>' + m.apply(txt, color1, color2, parse_out_whitespace) + '</div>';

	var node = document.getElementById(target);
	if(node != null && node != typeof 'undefined')
	{
		node.innerHTML = '';
		node.innerHTML = result;
	}
}

function make_multi_monster(txt, classes, colors, target)
{
	//test strings
	//=============
	//$a = "abcdefghijklmnopqrstuvwxyz"; //Caps or lower case, doesn't matter
	//$b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//$c = "!@#$%^&*()_+---=[]\{}|;':",./<>?`~";  //Not Recognized by Aierbazzi or Bagarozz
	//$d = "1234567890";  //Not Recognized by Aierbazzi or Bagarozz
	
	//***CRITICAL NOTE!!!: 
	//The &nbsp; span element is a critical component of this equation:
	//In order to avoid explicit text sizes I had to create a hack to get the Aierbazzi/Bagarozz fonts to work
	// -- Aierbazzi or Bagarozz won't display unless it has a &nbsp; with a min font-size of 1px; otherwise the container collapses to zero
	// -- AierBazzi and Bagarozz are odd fonts -- the characters stack on top of one another instead of side by side like normal fonts

	var m = new moarff();
	var parse_out_whitespace = true;
	var result = '<div class="'+classes+'"><span style="font-size:1px;">&nbsp;</span>' + m.multi_apply(txt, color1, color2, parse_out_whitespace) + '</div>';

	var node = document.getElementById(target);
	if(node != null && node != typeof 'undefined')
	{
		node.innerHTML = '';
		node.innerHTML = result;
	}
}


function random_str(max)
{
	var t = '';
	if(max != null)
	{
		for(var i = 0; i < max; i++)
		{
			var rand = Math.ceil(Math.random()*1000);
			rand = (rand % 25) + 1;
			switch(rand)
			{
				case 1:
					t += 'a';
					break;
				case 2:
					t += 'b';
					break;
				case 3:
					t += 'c';
					break;
				case 4:
					t += 'd';
					break;
				case 5:
					t += 'e';
					break;
				case 6:
					t += 'f';
					break;
				case 7:
					t += 'g';
					break;
				case 8:
					t += 'h';
					break;
				case 9:
					t += 'i';
					break;
				case 10:
					t += 'j';
					break;
				case 11:
					t += 'k';
					break;
				case 12:
					t += 'l';
					break;
				case 13:
					t += 'm';
					break;
				case 14:
					t += 'n';
					break;
				case 15:
					t += 'o';
					break;
				case 16:
					t += 'p';
					break;
				case 17:
					t += 'q';
					break;
				case 18:
					t += 'r';
					break;
				case 19:
					t += 's';
					break;
				case 20:
					t += 't';
					break;
				case 21:
					t += 'u';
					break;
				case 22:
					t += 'v';
					break;
				case 23:
					t += 'w';
					break;
				case 24:
					t += 'x';
					break;
				case 25:
					t += 'y';
					break;
				case 26:
					t += 'z';
					break;
				default:
					break;
			}
		}
	}
	return t;
}

function random_color()
{
	//start with decimal values from 0 - 255
	var r = Math.ceil((Math.random()*1000)%255);
	var g = Math.ceil((Math.random()*1000)%255);
	var b = Math.ceil((Math.random()*1000)%255);

	var color = new rgb();

	color.dec_update(r,g,b);

	return color.get_hexcode();
}

function animate_monster(i)
{

	make_monster(random_str(10), "", random_color(), random_color(), "monsta"+i);

  var m = jQuery('#monsta'+i);
  m.addClass("position_absolute");
  m.css("width", "180px");
  m.css("height", "180px");
  m.css("left", "100%");
  var randomBottomS = Math.ceil(Math.random()*100) % 50;
  m.css("bottom", randomBottomS+"%");
  
  var randomBottomF = "-" + Math.ceil(Math.random()*100) % 20 + "%";
  var randomLeft = "-" + (Math.ceil(Math.random()*100) % 20) + "%";

  m.animate(
    {
      left: randomLeft,
      bottom: randomBottomF
    },
    {
      duration: ((Math.ceil(Math.random()*100000) % 15000) + 7000 ),
      step: function(){

      },
      done: function(){
      	this.index = i;
      	var m = jQuery('#monsta'+this.index);
			  m.addClass("position_absolute");
			  m.css("bottom", "0px");
			  m.css("left", "100%");
        animate_monster(this.index);
      }
    }
  );
}

