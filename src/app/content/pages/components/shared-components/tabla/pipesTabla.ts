import { Fecha } from "../../../../models/fecha";

interface PipedValue {
  valor: any;
  clase: string;
}

export type IPipe = (pipedValue: PipedValue) => PipedValue;
type IPipeCurry = (arg: any) => IPipeCurry | IPipe;

export const toPipedValue = valor => ({ valor, clase: null });

export const pesosPipe: IPipe = ({ valor, clase }) => ({
  valor: `$ ${valor}`,
  clase
});

export const fechaPipe: IPipe = ({ valor, clase }) => ({
  valor: new Fecha(valor).front,
  clase
});

const getProximoAnidamiento = (objeto, propiedades) => {
  const arrayPropiedades = propiedades.split(".");
  const primeraPropiedad = arrayPropiedades.shift();
  const otrasPropiedades = arrayPropiedades.join(".");
  return {
    objeto: objeto[primeraPropiedad],
    propiedades: otrasPropiedades
  };
};

const getDato = (objeto, propiedades) => {
  if (propiedades.includes(".")) {
    const proximo = getProximoAnidamiento(objeto, propiedades);
    return getDato(proximo.objeto, proximo.propiedades);
  }
  return objeto[propiedades];
};

export const joinPipe: IPipeCurry = (atributo: string) => ({
  valor,
  clase
}) => ({
  valor: valor.map(v => getDato(v, atributo)).join(", "),
  clase
});

export const colorPipe: IPipeCurry = (color: "green" | "red") => ({
  valor,
  clase
}) => {
  let fontColor;
  switch (color) {
    case "green":
      fontColor = "m--font-success";
      break;
    case "red":
      fontColor = "m--font-danger";
      break;
  }
  return { valor, clase: `${clase} ${fontColor}` };
};
