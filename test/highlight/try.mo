function foo
//<- keyword
//       ^ function
  input Real x;
//^ keyword
//      ^ type.builtin
//           ^ variable.parameter
  input Real y;
//^ keyword
//      ^ type.builtin
//           ^ variable.parameter
protected
//<- keyword
  Real res;
//^ type.builtin
//     ^ variable.parameter
algorithm
//<- keyword
  try
//^ keyword
    res := x/y;
//  ^ variable.parameter
//      ^ operator
//         ^ variable.parameter
//          ^ operator
//           ^ variable.parameter
    break;
//  ^ keyword
  else
//^ keyword
    print("Divided by zero");
//  ^ function
//        ^ string
  end try;
//^ keyword
//    ^ keyword
end foo;
//<- keyword
//  ^ function
