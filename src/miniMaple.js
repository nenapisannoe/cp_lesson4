class MiniMaple{
    constructor(expression, variable)
    {
        this.expression = expression;
        this.variable = variable;
    }
    get expression()
    {
        return this._expression;
    }

    set expression(expr)
    {
        this._expression = expr
    }

    get varialbe()
    {
        return this._varialbe;
    }

    set varialbe(varb)
    {
        this._varialbe = varb
    }


    tokenize() 
    {
        return this._expression.match(/\d+|\+|\-|\*|\^|\(|\)|[a-z]+/g);
    }

    parseExpression()
    {
        let index = 0;
        let tokens = this.tokenize();
        let v = this.variable;
        function parseTerm()
        {
            let token = tokens[index];
            index++;

            if(!(isNaN(parseInt(token))))
            {
                return token;
            }
            else if(token == v)
            {
                return token
            }
            else
            {
                return 0;
            }
        }

        function parseFactor()
        {
            let left = parseTerm();
            while (index < tokens.length && (tokens[index] === '*' || tokens[index] === '^')) {
                const operator = tokens[index];
                index++;
                const right = parseTerm();
          
                if (operator === '*') {
                  left = ['*', left, right];
                } else if (operator === '^') {
                  left = ['^', left, right];
                }
              }
          
               return left;
        }
        let left = parseFactor();

        while (index < tokens.length && (tokens[index] === '+' || tokens[index] === '-')) {
          const operator = tokens[index];
          index++;
          const right = parseFactor();
      
          if (operator === '+') {
            left = ['+', left, right];
          } else if (operator === '-') {
            left = ['-', left, right];
          }
        }
      
        return left;
      }

      expressionToString(expression) 
      {
        if (typeof expression === 'number') 
        {
          return expression.toString();
        } 
        else if (typeof expression === 'string') 
        {
          return expression;
        } 
        else if (Array.isArray(expression)) 
        {
          const operator = expression[0];
          const left = this.expressionToString(expression[1]);
          const right = this.expressionToString(expression[2]);
      
          switch (operator) {
            case '+':
              return `${left} + ${right}`;
            case '-':
              return `${left} - ${right}`;
            case '*':
                {
                  
                    /*if((!(isNaN(parseInt(left))) && (!(isNaN(parseInt(right))))))
                    {
                        return `${parseInt(left)*parseInt(right)}`;
                    }
                    else 
                    {*/
                    console.log(left, ',', right);
                      return `${left} * ${right}`;
                    //}
                }
              
            case '/':
              return `${left} / ${right}`;
            case '^':
              {
                if(parseInt(right) === 1)
                {
                  return `${left}`;
                }
                return `${left}^${right}`;
              }
            default:
              throw new Error('Unsupported operator: ' + operator);
          }
        } 
        else 
        {
          throw new Error('Invalid expression: ' + expression);
        }
      }

      diff()
      {
        let expr = this.parseExpression();
        let diffexp = this.differentiateExpression(expr, this.variable);
        let res = this.expressionToString(diffexp);
        return res;
      }


     differentiateExpression(expression, variable) {
        if (expression === variable) 
        {
          return 1;
        } 
        else if (typeof expression === 'number') 
        {
          return 0;
        } 
        else if (Array.isArray(expression)) 
        {
          const operator = expression[0];
          const left = expression[1];
          const right = expression[2];
      
          switch (operator) {
            case '+':
              return ['+', this.differentiateExpression(left, variable), this.differentiateExpression(right, variable)];
            case '-':
              return ['-', this.differentiateExpression(left, variable), this.differentiateExpression(right, variable)];
            case '*':
              return ['+', ['*', left, this.differentiateExpression(right, variable)], ['*', right, this.differentiateExpression(left, variable)]];
            case '^':
              return ['*', parseInt(right), ['^', left, parseInt(right) - 1]];
              
            default:
              throw new Error('Unsupported operator: ' + operator);
          }
        } else {
          throw new Error('Invalid expression: ' + expression);
        }
      }
    }
      
      
    function test(expression, variable) 
    {
        let maple = new MiniMaple(expression, variable)
        const expr = maple.diff()
        console.log(expr); 
    }

    document.getElementById('demoButton').onclick = test('4*x^3-x^2', 'x');


export {MiniMaple}