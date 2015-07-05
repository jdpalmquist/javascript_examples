/* factor_trinomial.js */

/*
	Algorithm for factoring trinomials: Ax^2 + Bx + C = 0
	-----------------------------------------------------
	1. parse URI
	2. Find the Factor Sets of A, eg. Af & Ag, where Af * Ag = A
	3. Find the Factor Sets of C, eg. Cf & Cg, where Cf * Cg = C
	4. Cross Multiply the factor sets, eg. (Af * Cf) + (Ag * Cg) = R
	5. Compare R to B, if equal, add Af/Ag & Cf/Cg to the working factor set
	6. Evaluate working factor sets by putting them into final form (Af +|- Cf)(Ag +|- Cg)
	7. FOIL the resulting final form
	8. Combine b1 and b2 from the foil operation into B
	9. Compare resulting A,B,C with the starting Expression
	10. If a match add that final form to the list of successful answers
*/

//Init function
function factor_trinomial()
{
	//Step 1: get input
	//step handled by parseURI();
	
	//Step 2: Find the Factor Sets of A, eg. Af & Ag, where Af * Ag = A
	factorsA = find_factors_of(a);
		//print_factor_list_of(factorsA); //debug

	//Step 3: Find the Factor Sets of C, eg. Cf & Cg, where Cf * Cg = C
	factorsC = find_factors_of(c);
		//print_factor_list_of(factorsC); //debug

	//step 4: Cross Multiply the factor sets, eg. (Af * Cf) + (Ag * Cg) = R
	//step 5: Compare R to B, if equal, add Af/Ag & Cf/Cg to the working factor set
	working = find_working_factors(factorsA, factorsC);
		//print_working(working); //debug

	//step 6: Evaluate working factor sets by putting them into final form (Af +|- Cf)(Ag +|- Cg)
	final_forms = get_final_forms(working);
		//print_final_forms(final_forms); //debug
	
	//step 7: FOIL the resulting final form
	//step 8. Combine b1 and b2 from the foil operation into B
	//step 9. Compare resulting A,B,C with the starting Expression
	solution = check(final_forms);
		//print_solution(solution); //debug
}

function find_factors_of(x)
{
	factors = [];
	var len = factors.length
	if(x != 1 && x != -1 && x != 0 && x >= 2)
	{		
		for(var i = 1; i <= x; i++) //make sure i starts at 1 or else you will immediately divide by zero
		{
			//if i divided into x evenly that is a factor, capture the other value at this point too.
			var mod = x%i;
			if(mod == 0)
			{	
				var sib = x/i;
				factors[len] = [];
				factors[len]["f"] = i; //this is a factor
				factors[len]["g"] = sib; //this is the corresponding factor
				len++;
			}
		}
	}
	else if(x != 1 && x != -1 && x != 0 && x <= -2) //handle negative numbers
	{
		for(var i = x; i <= -1; i++) //make sure i starts at 1 or else you will immediately divide by zero
		{
			//if i divided into x evenly that is a factor, capture the other value at this point too.
			var mod = x%i;
			if(mod == 0)
			{	
				var sib = x/i;
				factors[len] = [];
				factors[len]["f"] = i; //this is a factor
				factors[len]["g"] = sib; //this is the corresponding factor
				len++;
			}
		}
	}
	else if(x == 1)
	{
		factors[len] = [];
		factors[len]["f"] = 1; //this is a factor
		factors[len]["g"] = 1; //this is the corresponding factor
		len++;
	}	
	else if(x == -1)
	{
		factors[len] = [];
		factors[len]["f"] = -1; //this is a factor
		factors[len]["g"] = -1; //this is the corresponding factor
		len++;
	}
	else if(x == 0)
	{
		factors[len] = [];
		factors[len]["f"] = 0; //this is a factor
		factors[len]["g"] = 0; //this is the corresponding factor
		len++;
	}

	return factors;
}

function find_working_factors(factorsA, factorsC)
{
	var max1,max2,Af,Ag,Cf,Cg,working,len;
	working = [];
	max1 = factorsA.length;
	max2 = factorsC.length;
	len = working.length;
	for(var i = 0; i < max1; i++)
	{
		for(var j = 0; j < max2; j++)
		{
			Af = factorsA[i]['f'];
			Ag = factorsA[i]['g'];
			Cf = factorsC[j]['f'];
			Cg = factorsC[j]['g'];
			b1 = (Af * Cf);
			b2 = (Ag * Cg);
			if((b1 + b2) == b) // if b1 + b2 == b this is a potential match!
			{	
				working[len] = [];
				working[len]["Af"] = Af;
				working[len]["Ag"] = Ag;
				working[len]["Cf"] = Cf;
				working[len]["Cg"] = Cg;
				working[len]["B1"] = b1;
				working[len]["B2"] = b2;
				len++;
			}
		}
	}

	return working;
}

function get_final_forms(working)
{
	//(Af +|- Cf)(Ag +|- Cg)

	var ff = [];
	len = ff.length;
	for(var i = 0; i < working.length; i++)
	{
		ff[len] = [];
		ff[len]["x1"] = working[i]["Af"];
		
		if(working[i]["B1"] < 0 && working[i]["Cf"] >= 0)
			ff[len]["y1"] = working[i]["Cf"] * -1;
		else if(working[i]["B1"] >= 0 && working[i]["Cf"] < 0)
			ff[len]["y1"] = working[i]["Cf"] * -1;
		else
			ff[len]["y1"] = working[i]["Cf"];

		ff[len]["x2"] = working[i]["Ag"];

		if(working[i]["B2"] < 0 && working[i]["Cg"] >= 0)
			ff[len]["y2"] = working[i]["Cg"] * -1;
		else if(working[i]["B2"] >= 0 && working[i]["Cg"] < 0)
			ff[len]["y2"] = working[i]["Cg"] * -1;
		else
			ff[len]["y2"] = working[i]["Cg"];

		ff[len]["working"] = working[i];

		len++;
	}
	return ff;
}

function check(ff)
{
	var _a, _b, _b1, _b2, _c, len, solution;
	solution = [];
	len = solution.length;

	for(var i = 0; i < ff.length; i++)
	{
		//foil
		_a = ff[i]["x1"] * ff[i]["x2"];
		_b1 = ff[i]["x1"] * ff[i]["y2"]; 
		_b2 = ff[i]["y1"] * ff[i]["x2"];
		_c = ff[i]["y1"] * ff[i]["y2"];

		//combine like terms (b1 and b2)
		_b = _b1 + _b2;

		//compare resulting expression to the original expression
		if( _a == a &&
			_b == b &&
			_c == c)
		{
			solution[len] = ff[i];
		}
	}
	return solution;
}