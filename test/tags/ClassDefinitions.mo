class C1 "Documentation"
//    ^ definition.class
end C1;

class C2
//    ^ definition.class
  "Documentation"
end C2;

optimization Opt "This has" + "a lot of documentation"
//           ^ definition.optimization
end Opt;

model MyModel
//    ^ definition.model
end MyModel;

record R
//     ^ definition.record
end R;

connector C
//        ^ definition.connector
end C;

type T
//   ^ definition.type
end T;

package PackageA
//      ^ definition.package
end PackageA;

function foo
//       ^ definition.function
end foo;

uniontype T2
//        ^ definition.uniontype
end T2;
