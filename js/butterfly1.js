/*
 
Butterfly version 3 (static)
=====================================================
Created By:  Jesse Palmquist on 5-5-2012
  
*/

var SHOW_DEBUG = true;
var BF_MAX = 10;
var DISTANCE_MIN = 10;
var i, index, temp, target, now, alpha, container, path_step, delay_time, timeout, elapsed, font_size, 
font_sizeC, font_sizeD, r,g,b,rC,gC,bC,rD,gD,bD, z_index, z_indexC, key_points, path_x, path_y, center_x, center_y, 
angle, final_angle, count, radius, radians, distance, x, y, xT, yT, xD, yD, parent;
index = 0;
temp = 0;
alpha = ['a','b','g','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','g','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
container = []; 
path_step = []; 
delay_time = []; 
elapsed = 0; 
timeout = 25;	
font_size = [];
font_sizeC = 0;
r = []; //color path
g = [];
b = [];	
rC = 0; 
gC = 0; 
bC = 0;
rD = 0;
gD = 0;
bD = 0;
z_index = []; 
x = []; 
y = []; 
xT = []; 
yT = []; 
xD = []; 
yD = [];
key_points = [1,90,180,270,360,450,540,630,719];
path_x = []; 
path_y = []; 
radians = 0;
radius = parseInt((window.innerWidth / 7));
center_x = (window.innerWidth / 2) - (radius + 45);
center_x = parseInt(center_x); // one half + offset for first loop
center_y = (window.innerHeight / 2) + (0 + 45);
center_y = parseInt(center_y); // one half
angle = 0; 
final_angle = 360; 
count = 0;
rC = 0;
gC = 0;
bC = 0;
font_sizeC = 0;
while( angle < final_angle) //first loop, left loop
{	
	radians = (angle * Math.PI) / 180;
	path_x[count] = center_x + radius * Math.cos(radians);
	path_y[count] = center_y + radius * Math.sin(radians);
	
	if(angle < 90)
	{
		rD = (128 - 0) / 90;
		gD = 0;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (25 - 0) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
		
	}
	if(angle >= 90 && angle < 180)
	{
		rD = (255 - 128) / 90;
		gD = 0;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (75 - 25) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	if(angle >= 180 && angle < 270)
	{
		rD = (128 - 255) / 90;
		gD = 0;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (20 - 75) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	if(angle >= 270 && angle < 360)
	{
		rD = (0 - 128) / 90;
		gD = (128 - 0) / 90;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (50 - 20) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	
	count++;
	angle++;
}	
center_x += radius * 2; //now draw the right loop
angle = 180; final_angle = 0;
while(angle >= final_angle) //first half, right loop
{
	radians = (angle * Math.PI) / 180;		
	path_x[count] = center_x + radius * Math.cos(radians);
	path_y[count] = center_y + radius * Math.sin(radians);
	if(angle >= 90)
	{
		rD = 0;
		gD = (255 - 128) / 90;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (75 - 50) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	if(angle < 90)
	{
		rD = 0;
		gD = (128 - 255) / 90;
		bD = 0;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (50 - 75) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	count++;
	angle--;
}
angle = 360; final_angle = 180;
while(angle >= final_angle) // second half, right loop
{
	radians = (angle * Math.PI) / 180;		
	path_x[count] = center_x + radius * Math.cos(radians);
	path_y[count] = center_y + radius * Math.sin(radians);
	if(angle > 270)
	{
		rD = 0;
		gD = (0 - 128) / 90;
		bD = (255 - 0)/ 90;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (25 - 50) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	if(angle >= 180 && angle < 270)
	{
		rD = 0;
		gD = 0;
		bD = (0 - 255) / 90;
		r[count] = rC;
		g[count] = gC;
		b[count] = bC;
		rC += rD;
		gC += gD;
		bC += bD;
		font_sizeD = (0 - 50) / 90;
		font_size[count] = font_sizeC;
		font_sizeC += font_sizeD;
		z_indexC = 1;
		z_index[count] = z_indexC;
	}
	count++;
	angle--;
}
//initialize
parent = document.getElementById('bf_container');
if(parent != null && parent !== undefined)
{		
	index = 0;
	i = 0; // alpha counter
	var limit = 15;
	BF_MAX = path_x.length / limit;
	
	while(index < BF_MAX)
	{		
		//Create the new span element
		temp = document.createElement('span');
		
		//Do some stuff to it
		if(i < alpha.length)
		{
			temp.innerHTML = alpha[i++];
		}
		else
		{
			i = 0;
			temp.innerHTML = alpha[i++];
		}
		
		temp.id = "_b"+index;
		temp.style.position = "absolute";
				
		//Append it to the parent container
		parent.appendChild(temp);
		
		//Now finish the initialization with jQuery
		temp = jQuery('#_b'+index);
		if(container != null)
		{
			temp.addClass("bf_class");
			temp.addClass("font_butterflies");			
		}
		
		
		//parent.innerHTML += '<span id="_b'+ index + '" class="bf_class">'+alpha[index]+'</span>';
		container[index] = document.getElementById('_b'+index);
		if(container[index] != null && container[index] !== undefined)
		{
			path_step[index] = index * limit;
			x[index] = path_x[path_step[index]];
			y[index] = path_y[path_step[index]];
			xT[index] = path_x[path_step[index] + 1];
			yT[index] = path_y[path_step[index] + 1];
			xD[index] = (xT[index] - x[index]) / get_distance(x[index],y[index],xT[index],yT[index]);
			yD[index] = (yT[index] - y[index]) / get_distance(x[index],y[index],xT[index],yT[index]);
									
			container[index].style.top = parseInt(y[index]) + "px";
			container[index].style.left = parseInt(x[index]) + "px";
			container[index].style.color = get_color(index);
			container[index].style.zIndex = parseInt(z_index[path_step[index]]);
			container[index].style.fontSize = parseInt(font_size[path_step[index]]) + "px";						
		}
		else
		{
			if(SHOW_DEBUG)
				alert('Failed to acquire child container # '+(index+1)+'!')
		}
		index++;
	}	
	//setTimeout(update, timeout); //start the process
}	
else
{
	if(SHOW_DEBUG)
		alert("Failed to acquire the parent container!");
}//end initialization
	

			

//Utility Functions
//=============================================================================================
function dec2hex(integer){ return integer.toString(16); }
function hex2dec(hexstring){ return parseInt(hexstring, 16); }
function get_color(i)
{
	temp = "";
	//Red
	r[path_step[i]] > 255 ? r[path_step[i]] = 255 :
	r[path_step[i]] < 0 ? r[path_step[i]] = 0:
	r[path_step[i]];
	if(r[path_step[i]] < 10)
	{
		temp += "#0" + dec2hex(parseInt(r[path_step[i]]));
	}
	else
	{
		temp += "#" + dec2hex(parseInt(r[path_step[i]]));
	}
	
	//Green
	g[path_step[i]] > 255 ? g[path_step[i]] = 255 :
	g[path_step[i]] < 0 ? g[path_step[i]] = 0:
	g[path_step[i]];
	if(g[path_step[i]] < 10)
	{
		temp += "0" + dec2hex(parseInt(g[path_step[i]]));
	}
	else
	{
		temp += dec2hex(parseInt(g[path_step[i]]));
	}
	
	//Blue
	b[path_step[i]] > 255 ? b[path_step[i]] = 255 :
	b[path_step[i]] < 0 ? b[path_step[i]] = 0:
	b[path_step[i]];
	if(b[path_step[i]] < 10)
	{
		temp += "0" + dec2hex(parseInt(b[path_step[i]]));
	}
	else
	{
		temp += dec2hex(parseInt(b[path_step[i]]));
	}
	
	return temp;
}
function rand(floor, max)
{
	max++;
	if(floor < 0)
		max += floor * -1;
	//Math.random() * max = 0 to max -1
	//by adding floor, you ensure a base minimum and extend the range of max by variable floor 
	return Math.floor(Math.random()*max) + floor;
}
function get_distance(x1,y1,x2,y2)
{
	var x,y,temp;
	x = x2 - x1;
	y = y2 - y1;
	temp = (x*x) + (y*y);
	return Math.sqrt(temp);
}
