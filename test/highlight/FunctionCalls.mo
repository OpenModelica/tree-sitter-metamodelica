function foo
//<- keyword
//       ^ function
protected
//<- keyword
  String s;
//^ type.builtin
//       ^ variable.parameter
algorithm
//<- keyword
  s := bar1(bar2("hello", "World"));
//^ variable.parameter
//  ^ operator
//     ^ function
//          ^ function
//               ^ string
//                        ^ string
end foo;
//<- keyword
//  ^ function
