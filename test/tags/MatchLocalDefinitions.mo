function foo "Some
  longish documentation."
  input T1 x;
//         ^ definition.variable
algorithm
  () := match x
    local
      Real y1;
//         ^ definition.variable
      list<T2> y2;
//             ^ definition.variable
      list<T> y3;
//            ^ definition.variable
      list<T<T, list<T>>> y4;
//                        ^ definition.variable
    case T1.R(_)
      algorithm
      doStuff(y1, y2);
    then ();

    else
    then fail();
  end match;
end foo;
