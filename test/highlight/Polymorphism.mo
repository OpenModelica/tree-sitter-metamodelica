function foo
//<- keyword
//       ^ function
algorithm
//<- keyword
  result := new<T1>(a, b);
//^ variable.parameter
//       ^ operator
//          ^ function
//             ^ operator
//              ^ type
//                ^ operator
//                  ^ variable.parameter
//                     ^ variable.parameter
  result := new<T1, T2>(a, b);
//^ variable.parameter
//       ^ operator
//          ^ function
//             ^ operator
//              ^ type
//                  ^ type
//                    ^ operator
//                      ^ variable.parameter
//                         ^ variable.parameter
end foo;
//<- keyword
//  ^ function
