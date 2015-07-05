/* trinomial_io.js */

function parseURI()
{
	/*
		//example of the URI parsing method I borrowed from Github.com
		var parser = document.createElement('a');
		parser.href = document.URL;	 
		parser.protocol; // => "http:"
		parser.hostname; // => "example.com"
		parser.port;     // => "3000"
		parser.pathname; // => "/pathname/"
		parser.search;   // => "?search=test"
		parser.hash;     // => "#hash"
		parser.host;     // => "example.com:3000"
	*/

	//Prepare the raw URI string
	var parser = document.createElement('a');
	parser.href = document.URL;	 
	parser.search;
	
	//variable declarations
	var params, paramsA, paramsB, paramsC;
	params =  [];
	paramsA = "";
	paramsB = "";
	paramsC = "";

	//parse the query string
	var query = parser.search;    // => "?query=string"
	query = query.replace("?", ""); //remove the "?"
	params = query.split("&"); //break into the variable pairs by splitting at the "&"
	paramsA = params[0]; //Variable/Value pair for A: a=someVal
	paramsB = params[1]; //Variable/Value pair for B: b=someVal
	paramsC = params[2]; //Variable/Value pair for C: c=someVal
	paramsA = paramsA.split("="); //retrieve the value by splitting at the "="
	paramsB = paramsB.split("="); //retrieve the value by splitting at the "="
	paramsC = paramsC.split("="); //retrieve the value by splitting at the "="

	//extract the values for each variable from the parsed URI
	a = paramsA[1]; //after splitting the variable name is in index 0, the value is index 1
	b = paramsB[1]; //after splitting the variable name is in index 0, the value is index 1
	c = paramsC[1]; //after splitting the variable name is in index 0, the value is index 1
	
	//make certain that a,b,c are parsed as integers and not as as strings
	a = parseInt(a);
	b = parseInt(b);
	c = parseInt(c);
	
	//absolute values of a,b,c
	if(a < 0)
		A = -1*a; // A = |a| 
	else
		A = a;
	if(b < 0)
		B = -1*b; // B = |B|
	else
		B = b;
	if(c < 0)
		C = -1*c; // C = |C|
	else
		C = c;

	//store the values in the pages hidden input elements for a,b,c
	document.getElementById("A").value = A;
	document.getElementById("B").value = B;
	document.getElementById("C").value = C;
	document.getElementById("a").value = a;
	document.getElementById("b").value = b;
	document.getElementById("c").value = c;
	
}

function print_starting_expression()
{
	var t = '';
	t += '<div class="expression">';
		t += '&nbsp;'+(a < 0 ? "-":"")+'&nbsp;<span>'+A+'</span>x<span class="large_super">2</span>&nbsp;'+(b < 0 ? "-":"+")+'&nbsp;<span>'+B+'</span>x&nbsp;'+(c < 0 ? "-":"+")+'&nbsp;<span>'+C+'</span>&nbsp;';
		t += '<br/>';
	t += '</div>';

	return t;
}

function print_intermediate_expression()
{
	//absolute values for the b1 and b2
	var B1, B2;
	if(b1 < 0)
		B1 = -1*b1;
	else
		B1 = b1;

	if(b2 < 0)
		B2 = -1*b2;
	else
		B2 = b2;

	var t = '';
	t += '<div>';
		t += '&nbsp;'+(a < 0 ? "-":"")+'<span>'+A+'</span>x<span class="large_super">2</span>&nbsp;'+(b1<0? "-":"+")+'&nbsp;<span>'+B1+'</span>x&nbsp;'+(b2<0? "-":"+")+'&nbsp;<span>'+B2+'</span>x&nbsp;'+(c < 0 ? "-":"+")+'<span>'+C+'</span>&nbsp;';
		t += '<br/>';
	t += '</div>';

	return t;
}

function print_solution()
{
	var t = '';
	for(var i = 0; i < solution.length; i++)
	{
		t += '<div id="solution_title">Solution</div>';
		t += '<div id="solution">(&nbsp;&nbsp;'+solution[i]["x1"]+'x '+(solution[i]["y1"] < 0 ? "-":"+")+' '+(solution[i]["y1"] < 0 ? -1*solution[i]["y1"] : solution[i]["y1"])+'&nbsp;&nbsp;)(&nbsp;&nbsp;'+solution[i]["x2"]+'x '+(solution[i]["y2"] < 0 ? "-" : "+" )+' '+(solution[i]["y2"] < 0 ? -1*solution[i]["y2"] : solution[i]["y2"] )+'&nbsp;&nbsp;)</div>';
	}
	if(t != '')
		document.getElementById("chalkboard").innerHTML = t;
	else
		alert("This trinomial cannot be factored");
}

function print_factor_list_of(factors)
{
	var t = '';
	for(var i = 0; i < factors.length; i++)
	{
		t += '<span>&nbsp;(&nbsp;&nbsp;'+factors[i]["f"]+'&nbsp;x&nbsp;'+factors[i]["g"]+'&nbsp;&nbsp;)&nbsp;</span>';
		//t += '<br/>';
	}
	return t;
}

function print_all_combos(factorsA, factorsC)
{
	var t = '';
	max1 = factorsA.length;
	max2 = factorsC.length;
	for(var i = 0; i < max1; i++)
	{
		for(var j = 0; j < max2; j++)
		{
			t += print_combos(  factorsA[i]["f"],
								factorsA[i]["g"],
								factorsC[j]["f"],
								factorsC[j]["g"]);
		}
	}
	return t;
}

function print_combos(x1,y1,x2,y2)
{
	var t = '';
		
	t += '<h5 style="color:#CCFFCC;">';

	t += '<br/>';
	
	t += '<div>';	
		
		t += '<span>Factors for A ~ '+x1+' x '+y1+'</span><br/>';
		t += '<span>Factors for C ~ '+x2+' x '+y2+'</span><br/>';			
			
		t += '<span>&nbsp;&nbsp;Result of A1 &times C1 &raquo;&nbsp;&nbsp;&nbsp;&nbsp;'+x1+' &times; '+x2+' = '+(x1*x2)+'</span><br/>';
		t += '<span>&nbsp;&nbsp;Result of A2 &times C2 &raquo;&nbsp;&nbsp;&nbsp;&nbsp;'+y1+' &times; '+y2+' = '+(y1*y2)+'</span><br/>';
			
		//plus plus
		if((x1*x2) + (y1*y2) == b)
		{
			//print the match found statement plus the link to step 3
			t += '<span style="color:white;">Potential Solution!&nbsp;</span>';
			t += '<span>&nbsp;&nbsp;&nbsp;'+(x1*x2)+'</span>';
			t += '<span>&nbsp;+&nbsp;</span>'; //plus symbol
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (x1*x2) + (y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<span>&nbsp;&nbsp;</span>';
			t += '<span style="color:white;">';
				t += '<strong>&#10031;&nbsp;&nbsp;</strong>';
				t += '<div class="finish_block">';
					t += '<a id="finish" class="next" onclick="goto_step3()">';
						t += 'Next';
					t += '</a>';
				t += '</div>';
			t += '</span>';
			t += '<br/>';
		}
		else
		{
			//no match -- just print the test statements				
			t += '<span>&nbsp;&nbsp;&nbsp;'+(x1*x2)+'</span>';
			t += '<span>&nbsp;+&nbsp;</span>';//plus symbol
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (x1*x2) + (y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<br/>';
		}	

		//plus minus
		if((x1*x2) + (-1*y1*y2) == b)
		{
			//print the match found statement plus the link to step 3
			t += '<span style="color:white;">Potential Solution!&nbsp;</span>';
			t += '<span>&nbsp;&nbsp;&nbsp;'+(x1*x2)+'</span>';
			t += '<span>&nbsp;-&nbsp;</span>'; //minus symbol
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (x1*x2) + (-1*y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<span>&nbsp;&nbsp;</span>';
			t += '<span style="color:white;">';
				t += '<strong>&#10031;&nbsp;&nbsp;</strong>';
				t += '<div class="finish_block">';
					t += '<a id="finish" class="next" onclick="goto_step3()">';
						t += 'Next';
					t += '</a>';
				t += '</div>';
			t += '</span>';
			t += '<br/>';
		}
		else
		{
			//no match -- just print the test statements				
			t += '<span>&nbsp;&nbsp;&nbsp;'+(x1*x2)+'</span>';
			t += '<span>&nbsp;-&nbsp;</span>'; //minus
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (x1*x2) + (-1*y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<br/>';
		}

		//minus plus
		if((-1*x1*x2) + (y1*y2) == b)
		{
			//print the match found statement plus the link to step 3
			t += '<span style="color:white;">Potential Solution!&nbsp;</span>';
			t += '<span>&nbsp;&nbsp;&nbsp;'+(-1*x1*x2)+'</span>';
			t += '<span>&nbsp;+&nbsp;</span>';//plus symbol
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (-1*x1*x2) + (y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<span>&nbsp;&nbsp;</span>';
			t += '<span style="color:white;">';
				t += '<strong>&#10031;&nbsp;&nbsp;</strong>';
				t += '<div class="finish_block">';
					t += '<a id="finish" class="next" onclick="goto_step3()">';
						t += 'Next';
					t += '</a>';
				t += '</div>';
			t += '</span>';
			t += '<br/>';
		}
		else
		{
			//no match -- just print the test statements				
			t += '<span>&nbsp;&nbsp;&nbsp;'+(-1*x1*x2)+'</span>';
			t += '<span>&nbsp;+&nbsp;</span>'; //plus symbol
			t += '<span>'+(y1*y2)+'</span>';
			t += '<span>&nbsp;'+( ( (x1*x2) + (y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<br/>';
		}

		//minus minus
		if((-1*x1*x2) + (-1*y1*y2) == b)
		{
			//print the match found statement plus the link to step 3
			t += '<span style="color:white;">Potential Solution!&nbsp;</span>';
			t += '<span>&nbsp;&nbsp;&nbsp;'+(-1*x1*x2)+'</span>';
			t += '<span>&nbsp;-&nbsp;</span>'; //minus symbol
			t += '<span>'+(y1*y2)+'</span>'; //leave this as an absolute value 
			t += '<span>&nbsp;'+( ( (-1*x1*x2) + (-1*y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<span>&nbsp;&nbsp;</span>';
			t += '<span style="color:white;">';
				t += '<strong>&#10031;&nbsp;&nbsp;</strong>';
				t += '<div class="finish_block">';
					t += '<a id="finish" class="next" onclick="goto_step3()">';
						t += 'Next';
					t += '</a>';
				t += '</div>';
			t += '</span>';
			t += '<br/>';
		}
		else
		{
			//no match -- just print the test statements				
			t += '<span>&nbsp;&nbsp;&nbsp;'+(-1*x1*x2)+'</span>';
			t += '<span>&nbsp;-&nbsp;</span>'; //minus symbol
			t += '<span>'+(y1*y2)+'</span>'; //leave this as an absolute value 
			t += '<span>&nbsp;'+( ( (-1*x1*x2) + (-1*y1*y2) == b) == true ? '=' : '&ne;')+'&nbsp;<span>'+b+'</span>';
			t += '<br/>';
		}
				
		t += '</div>';
	
	t += '</h5>';

	return t;
}

function print_working_factor_set()
{
	var t = '';
	for(var i = 0; i < working.length; i++)
	{
		//working[i]["B1"] = working[i]["Af"] * working[i]["Cf"];
		//working[i]["B2"] = working[i]["Ag"] * working[i]["Cg"];

		t += '<br/>';
		t += 'Set ' + (i+1);
		t += '<br/>'
		t += '&nbsp;&nbsp;A: ( '+working[i]["Af"]+' x '+working[i]["Ag"]+' )';
		t += '<br/>';
		t += '&nbsp;&nbsp;C: ( '+working[i]["Cf"]+' x '+working[i]["Cg"]+' )';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;Af x Cf: ('+working[i]["Af"]+' x '+working[i]["Cf"]+') = '+(working[i]["B1"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;Ag x Cg: ('+working[i]["Ag"]+' x '+working[i]["Cg"]+') = '+(working[i]["B2"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B1) + (B2): ('+working[i]["B1"]+') + ('+working[i]["B2"]+') = '+(working[i]["B1"] + working[i]["B2"]) + '<span style="color:white;">&nbsp;&nbsp;&#10031;&nbsp;&nbsp;Potential Solution!&nbsp;</span>';
		t += '<br/>';
	}
	return t;
}

function print_evaluate_working_factor_set()
{
	var count = 0;
	var t = '';
	for(var i = 0; i < solution.length; i++)
	{
		t += '<br/>';
		t += 'Evaluate Set ' + (count+1);
		t += '<br/>';
		t += '&nbsp;&nbsp;Factors of A: ( '+working[i]["Af"]+' x '+working[i]["Ag"]+' )';
		t += '<br/>';
		t += '&nbsp;&nbsp;Factors of C: ( '+working[i]["Cf"]+' x '+working[i]["Cg"]+' )';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;These values take the First Positions ~ ('+working[i]["Af"]+' , '+working[i]["Cf"]+')';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;These values take the Second Positions ~ ('+working[i]["Ag"]+' , '+working[i]["Cg"]+')';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;Create the Final Expression ~ (&nbsp;&nbsp;'+working[i]["Af"]+'x '+(working[i]["Cf"] < 0 ? '-':'+')+' '+(working[i]["Cf"] < 0 ? -1 * working[i]["Cf"] : working[i]["Cf"])+' &nbsp;&nbsp;)(&nbsp;&nbsp;'+working[i]["Ag"]+'x '+(working[i]["Cg"] < 0 ? '-':'+')+' '+(working[i]["Cg"] < 0 ? -1 * working[i]["Cg"] : working[i]["Cg"])+' &nbsp;&nbsp;)';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;Now FOIL to expand the equation.';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(First) A = ('+working[i]["Af"]+' x '+working[i]["Ag"]+') = '+(working[i]["Af"] * working[i]["Ag"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Outside) B1 = ('+working[i]["Af"]+' x '+working[i]["Cg"]+') = '+(working[i]["Af"] * working[i]["Cg"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Inside) B2 = ('+working[i]["Cf"]+' x '+working[i]["Ag"]+') = '+(working[i]["Cf"] * working[i]["Ag"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Last) C = ('+working[i]["Cf"]+' x '+working[i]["Cg"]+') = '+(working[i]["Cf"] * working[i]["Cg"]);
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This gives us the values for the intermediate expression:';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(working[i]["Af"] * working[i]["Ag"])+'x<span class="large_super">2</span> '+((working[i]["B1"]) < 0 ? '-':'+')+' '+(working[i]["B1"] < 0 ? -1 * working[i]["B1"] : working[i]["B1"])+'x '+(working[i]["B2"] < 0 ? '-':'+')+' '+((working[i]["B2"]) < 0 ? -1 * working[i]["B2"] : working[i]["B2"])+'x '+((working[i]["Cf"] * working[i]["Cg"]) < 0 ? "-":"+")+" "+((working[i]["Cf"] * working[i]["Cg"]) < 0 ? -1 * (working[i]["Cf"] * working[i]["Cg"]) : (working[i]["Cf"] * working[i]["Cg"]));
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now combine like Terms:';
		t += '<br/>';
		t += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(working[i]["Af"] * working[i]["Ag"])+'x<span class="large_super">2</span> '+((working[i]["B1"] + working[i]["B2"]) < 0 ? '-':'+')+' '+(working[i]["B1"] + working[i]["B2"] < 0 ? -1 * (working[i]["B1"] + working[i]["B2"]) : working[i]["B1"] + working[i]["B2"])+'x '+((working[i]["Cf"] * working[i]["Cg"]) < 0 ? "-":"+")+" "+((working[i]["Cf"] * working[i]["Cg"]) < 0 ? -1 * (working[i]["Cf"] * working[i]["Cg"]) : (working[i]["Cf"] * working[i]["Cg"]));
		t += '<br/>';
		t += 'Original Expression:';
		t += '<br/>';
		t += print_starting_expression();
		t += '<br/>';
		t += '<div id="solution_title">Solution</div>';
		t += '<br/>';
		t += '<div class="solution">(&nbsp;&nbsp;'+working[i]["Af"]+'x '+(working[i]["Cf"] < 0 ? '-':'+')+' '+(working[i]["Cf"] < 0 ? -1 * working[i]["Cf"] : working[i]["Cf"])+' &nbsp;&nbsp;)(&nbsp;&nbsp;'+working[i]["Ag"]+'x '+(working[i]["Cg"] < 0 ? '-':'+')+' '+(working[i]["Cg"] < 0 ? -1 * working[i]["Cg"] : working[i]["Cg"])+' &nbsp;&nbsp;)</div>';

		count++;
	}

	if(t == "")
		t += 'This Trinomial cannot be factored';

	return t;
}


function print_step1()
{
	var t = '';

	t += print_starting_expression();

	t += '<div class="section_title">Step 1</div>';

	t += '<div>Find the factors of <strong><i>A</i></strong> [ '+a+' ] &amp; <strong><i>C</i></strong> [ '+c+' ] from the equation above</div>';

	t += '<br/>';

	t += '<div>Factors of A:</div>';

	t += '<div>'+print_factor_list_of(factorsA)+'</div>';

	t += '<br/>';

	t += '<div>Factors of C:</div>';

	t += '<div>'+print_factor_list_of(factorsC)+'</div>';

	t += '<br/><br/>';

	document.getElementById("chalkboard").innerHTML = t;
}

function print_step2()
{
	var t = '';

	t += print_starting_expression();

	t += '<div class="section_title">Step 2</div>';

	t += '<div>Now that we have factor sets of A and C';
		t += '<br/>';
		t += '&nbsp;&nbsp;i.e.: Af & Ag, where Af &times; Ag = A';
		t += '<br/>';
		t += 'Cross Multiply to find our &ldquo;working&rdquo; factor set';
		t += '<br/>';
		t += '&nbsp;&nbsp;e.g.: (&nbsp;&nbsp;Af &times; Cf&nbsp;&nbsp;) + (&nbsp;&nbsp;Ag &times; Cg&nbsp;&nbsp;) = B';
		t += '<br/>';
		t += 'If the result from the cross multiplication is equivalent to B then it might be a potential solution. However in order to determine a solution it must be tested.';
	t += '</div>';	
	t += '<br/>';

	t += print_all_combos(factorsA,factorsC);

	document.getElementById("chalkboard").innerHTML = t;
}

function print_step3()
{
	var t = '';

	t += print_starting_expression();

	t += '<div class="section_title">Step 3</div>';
	t += '<div>Working factor Set:';
		t += '<br/>';

	if(working.length > 0)
	{
		t += 'This factor set was selected because the factors could be combined to equal B, as illustrated below.';
		t += '<br/>';
		t += print_working_factor_set();
		
	}
	else
	{
		t += 'No Matches found, the Trinomial is not factorable';
		document.getElementById("next").className += "display_hidden";
	}

	t += '</div>';	
	t += '<br/>';

	document.getElementById("chalkboard").innerHTML = t;
}

function print_step4()
{
	var t = '';

	t += print_starting_expression();

	t += '<div class="section_title">Step 4</div>';
	
	t += '<div>Evaluate the Working Set:';
		t += '<br/>';
		t += 'Transform the working set into a final factored form, then FOIL each final factored form. If the FOILed version matches the original equation we have a winner.';
		t += '<br/>';
		t += print_evaluate_working_factor_set();
	t += '</div>';	
	t += '<br/>';	

	document.getElementById("chalkboard").innerHTML = t;
}

//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//Debug Print Functions
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
function print_working_debug(working)
{
	var t = '';
	for(var i = 0; i < working.length; i++)
	{
		t += 'Index '+ (i+1) +'\n\n';
		t += 'A: ( '+working[i]["Af"]+' x '+working[i]["Ag"]+' )\n\n';
		t += 'C: ( '+working[i]["Cf"]+' x '+working[i]["Cg"]+' )\n\n';
		t += 'Af x Cf: ('+working[i]["Af"]+' x '+working[i]["Cf"]+') = '+working[i]["B1"]+'\n\n';
		t += 'Ag x Cg: ('+working[i]["Ag"]+' x '+working[i]["Cg"]+') = '+working[i]["B2"]+'\n\n';
		t += '(B1) + (B2): ('+working[i]["B1"]+') + ('+working[i]["B2"]+') = '+(working[i]["B1"] + working[i]["B2"])+'\n\n';
	}
	alert(t);
}

function print_final_forms_debug(ff)
{
	var t = '';
	for(var i = 0; i < ff.length; i++)
	{
		t += 'Index '+ (i+1) +'\n\n';
		t += '('+ff[i]["x1"]+' '+ff[i]["y1"]+')('+ff[i]["x2"]+' '+ff[i]["y2"]+')\n\n';
	}
	alert(t);
}

function print_solution_debug(solution)
{
	var t = '';
	for(var i = 0; i < solution.length; i++)
	{
		t += 'Index '+ (i+1) +'\n\n';
		t += '('+solution[i]["x1"]+' '+solution[i]["y1"]+')('+solution[i]["x2"]+' '+solution[i]["y2"]+')\n\n';
	}
	if(t != '')
		alert(t);
	else
		alert("This trinomial cannot be factored");
}
