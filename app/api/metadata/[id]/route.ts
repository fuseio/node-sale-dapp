export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);
  const formatOrdinals = (n: number) => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
  };

  const id = parseInt(params.id) + 1;

  return Response.json({
    "description": `${formatOrdinals(id)} tier of Fuse Node Sale`,
    "external_url": "https://node-sale.fuse.io",
    "image": `https://storage.googleapis.com/opensea-prod.appspot.com/puffs/${id}.png`,
    "name": `${formatOrdinals(id)} tier`,
  })
}
