function foo
  input Absyn.Operator operator;
//                     ^ definition.variable
  input Real i1 "This is some input";
//           ^ definition.variable
  output Real o1 "This is some output";
//            ^ definition.variable
protected
  Real x1 "Some protected variable";
//     ^ definition.variable
  Integer x2;
//        ^ definition.variable
  Boolean x3;
//        ^ definition.variable
  String x4;
//       ^ definition.variable
  MyType x5;
//       ^ definition.variable
public
  List<Real> x6 "Some public variable";
//           ^ definition.variable
  List<MyType> x7;
//             ^ definition.variable
  Option<Real> x8;
//             ^ definition.variable
  Option<MyType> x9;
//               ^ definition.variable
  Tuple<T1, T2, T3> x10;
//                  ^ definition.variable
end foo;
