function foo
// <- keyword
//       ^ function
  Real x1;
//^ type.builtin
//     ^ @variable.parameter
  Integer x2;
//^ type.builtin
//        ^ @variable.parameter
  Boolean x3;
//^ type.builtin
//        ^ @variable.parameter
  String x4;
//^ type.builtin
//       ^ @variable.parameter
  MyType x5;
//^ type
//       ^ @variable.parameter
  List<Real> x6;
//^ type.builtin
//     ^ type.builtin
//           ^ @variable.parameter
  List<MyType> x7;
//^ type.builtin
//     ^ type
//             ^ @variable.parameter
  Option<Real> x8;
//^ type.builtin
//       ^ type.builtin
//             ^ @variable.parameter
  Option<MyType> x9;
//^ type.builtin
//       ^ type
//               ^ @variable.parameter
  Tuple<T1, T2, T3> x10;
//^ type.builtin
//      ^ type
//          ^ type
//              ^ type
//                  ^ @variable.parameter
end foo;
// <- keyword
//  ^ function
