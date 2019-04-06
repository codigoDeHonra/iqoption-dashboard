export const eventosGetter = state => state.eventos;
export const eventoGetter = (state) => {
    return id =>  state.eventos[id];
}
