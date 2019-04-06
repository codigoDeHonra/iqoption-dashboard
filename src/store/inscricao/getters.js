export const inscricoesGetter = state => state.inscricoes;
export const inscricaoGetter = (state) => {
    return id =>  state.inscricoes[id];
}
