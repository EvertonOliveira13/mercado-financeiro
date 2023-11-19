function carregaData(){
    const hoje = new Date()
    //hoje.toISOString().split('T')[0]
    //console.log(hoje.toISOString().split('T')[0])
    document.getElementById('dataAtual').innerText = "Data atual: "+hoje.toISOString().split('T')[0]

}