function foo
//<- keyword
//       ^ function
  input list<String> args "List of arguments";
//^ keyword
//      ^ type
//           ^ type.builtin
//                   ^ variable.parameter
//                        ^ comment
protected
//<- keyword
  String s;
//^ type.builtin
//       ^ variable.parameter
algorithm
//<- keyword
  s := bar1(bar2("hello", "World", args));
//^ variable.parameter
//  ^ operator
//     ^ function
//          ^ function
//               ^ string
//                        ^ string
end foo;
//<- keyword
//  ^ function
