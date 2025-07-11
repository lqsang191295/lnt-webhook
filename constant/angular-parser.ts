// angular-parser.ts
import expressions from "angular-expressions";

function AngularParser(tag: string) {
  const expr = expressions.compile(tag);
  return {
    get(scope: Record<string, unknown>) {
      return expr(scope);
    },
  };
}

export default AngularParser;
