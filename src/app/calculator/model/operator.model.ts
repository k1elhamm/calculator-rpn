export enum OperatorEnum{
    ADD='ADD', SUB='SUB', MUL='MUL', DIV='DIV', NEG='NEG', DEL='DEL', SWAP='SWAP'
}

export interface IOperators {
    operators: OperatorEnum[]
}