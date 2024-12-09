function gerarGraficoLinhaDias(sundayValue, saturdayValue, macAddress, componente){
    let servidorName = "Servidor 4";

    if(macAddress == "f946307321c2") servidorName = "Servidor 1";
    else if(macAddress == "14857f833746") servidorName = "Servidor 2";
    else if(macAddress == "d09466c9be45") servidorName = "Servidor 3";

    const diaSemanas = ["Sáb", "Dom", "Seg", "Ter", "Qua", "Qui", "Sex"];
    
    fetch("../historico/pegarMedias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sundayServer: sundayValue,
            saturdayServer: saturdayValue,
            macAddressServer: macAddress
        })
    })
    .then(function(resposta){
        if(resposta.ok){
            resposta.json().then((jsonDataValues)=>{
                console.log(jsonDataValues);

                historicoEmDiasChart.data.labels = [];
                historicoEmDiasChart.data.datasets[0].data = [];
                historicoEmDiasChart.data.datasets[1].data = [];
                historicoEmDiasChart.update();
                    
                const arrayValues = [];
                const labelValues = [];
                const maxValues = [];

                if(componente == 1){
                    jsonDataValues.forEach(item => {
                        const date = new Date(item.dia);
                        const day = String(date.getDate() + 1 - 1).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const diaSemanaIndex = date.getDay();
                        const diaFormatado = `${diaSemanas[diaSemanaIndex]} - ${day}/${month}/${year}`;

                        arrayValues.push(item.cpuPorc);
                        labelValues.push(diaFormatado);
                        maxValues.push(85);
                    });

                    historicoEmDiasChart.data.datasets[0].data = arrayValues;
                    historicoEmDiasChart.data.datasets[1].data = maxValues;
                    historicoEmDiasChart.data.labels = labelValues;
                    historicoEmDiasChart.data.datasets[0].label = "Uso do Processador";
                    historicoEmDiasChart.data.datasets[0].borderColor = 'rgba(255, 218, 107, 0.8)';
                    historicoEmDiasChart.data.datasets[0].backgroundColor = 'rgba(255, 218, 107, 0.2)';
                    historicoEmDiasChart.data.datasets[0].pointBackgroundColor = 'rgb(255, 218, 107)';
                    historicoEmDiasChart.options.plugins.title.text = `Uso do Processador no ${servidorName} (${labelValues[0].split(' - ')[1]} - ${labelValues[labelValues.length - 1].split(' - ')[1]})`;
                    historicoEmDiasChart.options.scales.y.max = 100;
                    historicoEmDiasChart.options.scales.y.title.text = "Percentual de Uso";
                    historicoEmDiasChart.data.datasets.splice(2, 1);
                }
                else if(componente == 2) {
                    jsonDataValues.forEach(item => {
                        const date = new Date(item.dia);
                        const day = String(date.getDate() + 1).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const diaSemanaIndex = date.getDay();
                        const diaFormatado = `${diaSemanas[diaSemanaIndex]} - ${day}/${month}/${year}`;

                        arrayValues.push(item.memoriaPorc);
                        labelValues.push(diaFormatado);
                        maxValues.push(85);
                    });

                    historicoEmDiasChart.data.datasets[0].data = arrayValues;
                    historicoEmDiasChart.data.datasets[1].data = maxValues;
                    historicoEmDiasChart.data.labels = labelValues;
                    historicoEmDiasChart.data.datasets[0].label = "Uso da Memória RAM";
                    historicoEmDiasChart.data.datasets[0].borderColor = 'rgba(192, 178, 160, 0.8)';
                    historicoEmDiasChart.data.datasets[0].backgroundColor = 'rgba(192, 178, 160, 0.2)';
                    historicoEmDiasChart.data.datasets[0].pointBackgroundColor = 'rgb(192, 178, 160)';
                    historicoEmDiasChart.options.plugins.title.text = `Uso da Memória RAM no ${servidorName} (${labelValues[0].split(' - ')[1]} - ${labelValues[labelValues.length - 1].split(' - ')[1]})`;
                    historicoEmDiasChart.options.scales.y.max = 100;
                    historicoEmDiasChart.options.scales.y.title.text = "Percentual de Uso";
                    historicoEmDiasChart.data.datasets.splice(2, 1);
                }
                else if(componente == 3){
                    jsonDataValues.forEach(item => {
                        const date = new Date(item.dia);
                        const day = String(date.getDate() + 1).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const diaSemanaIndex = date.getDay();
                        const diaFormatado = `${diaSemanas[diaSemanaIndex]} - ${day}/${month}/${year}`;

                        arrayValues.push(item.discoPorc);
                        labelValues.push(diaFormatado);
                        maxValues.push(85);
                    });

                    historicoEmDiasChart.data.datasets[0].data = arrayValues;
                    historicoEmDiasChart.data.datasets[1].data = maxValues;
                    historicoEmDiasChart.data.labels = labelValues;
                    historicoEmDiasChart.data.datasets[0].label = "Armazenamento";
                    historicoEmDiasChart.data.datasets[0].borderColor = 'rgba(249, 146, 44, 0.8)';
                    historicoEmDiasChart.data.datasets[0].backgroundColor = 'rgba(249, 146, 44, 0.2)';
                    historicoEmDiasChart.data.datasets[0].pointBackgroundColor = 'rgb(249, 146, 44)';
                    historicoEmDiasChart.options.plugins.title.text = `Armazenamento em Uso no ${servidorName} (${labelValues[0].split(' - ')[1]} - ${labelValues[labelValues.length - 1].split(' - ')[1]})`;
                    historicoEmDiasChart.options.scales.y.max = 100;
                    historicoEmDiasChart.options.scales.y.title.text = "Percentual de Uso";
                    historicoEmDiasChart.data.datasets.splice(2, 1);
                }
                else if(componente == 4){
                    jsonDataValues.forEach(item => {
                        const date = new Date(item.dia);
                        const day = String(date.getDate() + 1).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const diaSemanaIndex = date.getDay();
                        const diaFormatado = `${diaSemanas[diaSemanaIndex]} - ${day}/${month}/${year}`;

                        arrayValues.push(item.latencia);
                        labelValues.push(diaFormatado);
                        maxValues.push(100);
                    });

                    historicoEmDiasChart.data.datasets[0].data = arrayValues;
                    historicoEmDiasChart.data.datasets[1].data = maxValues;
                    historicoEmDiasChart.data.labels = labelValues;
                    historicoEmDiasChart.data.datasets[0].label = "Latência";
                    historicoEmDiasChart.data.datasets[0].borderColor = 'rgba(102, 35, 168, 0.8)';
                    historicoEmDiasChart.data.datasets[0].backgroundColor = 'rgba(102, 35, 168, 0.2)';
                    historicoEmDiasChart.data.datasets[0].pointBackgroundColor = 'rgb(102, 35, 168)';
                    historicoEmDiasChart.options.plugins.title.text = `Latência (${labelValues[0].split(' - ')[1]} - ${labelValues[labelValues.length - 1].split(' - ')[1]})`;
                    historicoEmDiasChart.options.scales.y.max = 140;
                    historicoEmDiasChart.options.scales.y.title.text = "Tempo de Resposta (Ms)";
                    historicoEmDiasChart.data.datasets.splice(2, 1);
                }
                else {
                    const mbpsEnviados = [];

                    jsonDataValues.forEach(item => {
                        const date = new Date(item.dia);
                        const day = String(date.getDate() + 1).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const diaSemanaIndex = date.getDay();
                        const diaFormatado = `${diaSemanas[diaSemanaIndex]} - ${day}/${month}/${year}`;

                        arrayValues.push(item.mbpsRecebidos);
                        mbpsEnviados.push(item.mbpsEnviados);
                        labelValues.push(diaFormatado);
                        maxValues.push(100);
                    });

                    historicoEmDiasChart.data.datasets[0].data = arrayValues;
                    historicoEmDiasChart.data.datasets[1].data = maxValues;
                    historicoEmDiasChart.data.labels = labelValues;
                    historicoEmDiasChart.data.datasets[0].label = "Pacotes Recebidos";
                    historicoEmDiasChart.data.datasets[0].borderColor = 'rgba(5, 208, 222, 0.8)';
                    historicoEmDiasChart.data.datasets[0].backgroundColor = 'rgba(5, 208, 222, 0.2)';
                    historicoEmDiasChart.data.datasets[0].pointBackgroundColor = 'rgb(5, 208, 222)';

                    historicoEmDiasChart.data.datasets[2] = {
                        data: mbpsEnviados,
                        label: "Pacotes Enviados",
                        borderColor: 'rgba(125, 148, 60, 0.8)',
                        backgroundColor: 'rgba(125, 148, 60, 0.2)',
                        pointBackgroundColor: 'rgb(125, 148, 60)',
                        fill: true,
                        lineTension: 0.3,
                    }

                    historicoEmDiasChart.options.plugins.title.text = `Rede (${labelValues[0].split(' - ')[1]} - ${labelValues[labelValues.length - 1].split(' - ')[1]})`;
                    historicoEmDiasChart.options.scales.y.max = 140;
                    historicoEmDiasChart.options.scales.y.title.text = "Velocidade (mbps)";
                }

                historicoEmDiasChart.update();
            })
        } else throw "Erro na captura de dados de pegarMedias";
    })
    .catch(function(erro){
        console.error(erro);
    });
}