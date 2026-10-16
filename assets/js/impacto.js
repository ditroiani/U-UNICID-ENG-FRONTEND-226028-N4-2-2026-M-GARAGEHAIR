document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       ELEMENTOS DOS INDICADORES
       ========================================================= */
    const totalReciclado =
        document.querySelector("#total-reciclado");
    const reducaoAgua =
        document.querySelector("#reducao-agua");
    const reducaoEnergia =
        document.querySelector("#reducao-energia");
    const totalAtendimentos =
        document.querySelector("#total-atendimentos");

    /* =========================================================
       CANVAS DOS GRÁFICOS
       ========================================================= */
    const graficoReciclagemCanvas =
        document.querySelector("#graficoReciclagem");
    const graficoAguaCanvas =
        document.querySelector("#graficoAgua");
    const graficoResiduosCanvas =
        document.querySelector("#graficoResiduos");

    /* =========================================================
       CARREGAMENTO DO CSV
       ========================================================= */
    async function carregarDados() {
        try {
            const response =
                await fetch("../assets/data/impacto.csv");

            if (!response.ok) {
                throw new Error(
                    `Erro ao carregar CSV: ${response.status}`
                );
            }

            const textoCSV =
                await response.text();
            const dados =
                converterCSV(textoCSV);

            atualizarIndicadores(dados);
            criarGraficoReciclagem(dados);
            criarGraficoAgua(dados);
            criarGraficoResiduos(dados);
        } catch (error) {
            console.error(
                "Erro ao carregar os dados de impacto:",
                error
            );
        }
    }

    /* =========================================================
       CONVERSÃO CSV → ARRAY DE OBJETOS
       ========================================================= */
    function converterCSV(csv) {
        /*
         * Remove espaços extras e divide
         * o arquivo em linhas.
         */
        const linhas =
            csv.trim().split(/\r?\n/);

        /*
         * A primeira linha representa
         * os nomes das colunas.
         */
        const cabecalho =
            linhas[0].split(",");

        /*
         * Percorremos todas as linhas
         * a partir da segunda.
         */
        return linhas
            .slice(1)
            .map(linha => {
                const valores =
                    linha.split(",");
                const objeto = {};

                cabecalho.forEach((campo, indice) => {
                    objeto[campo.trim()] =
                        valores[indice]?.trim();
                });

                /*
                 * Converte os campos numéricos.
                 */
                objeto.reciclados_kg =
                    Number(objeto.reciclados_kg);
                objeto.agua_litros =
                    Number(objeto.agua_litros);
                objeto.energia_kwh =
                    Number(objeto.energia_kwh);
                objeto.atendimentos_sociais =
                    Number(objeto.atendimentos_sociais);
                objeto.papel_kg =
                    Number(objeto.papel_kg);
                objeto.plastico_kg =
                    Number(objeto.plastico_kg);
                objeto.vidro_kg =
                    Number(objeto.vidro_kg);
                objeto.metal_kg =
                    Number(objeto.metal_kg);

                return objeto;
            });
    }


    /* =========================================================
       INDICADORES
       ========================================================= */
    function atualizarIndicadores(dados) {
        if (!dados.length) return;
        /* -----------------------------------------
           Total reciclado
           ----------------------------------------- */
        const recicladoTotal =
            dados.reduce(
                (total, item) =>
                    total + item.reciclados_kg,
                0
            );

        /* -----------------------------------------
           Redução de água
           ----------------------------------------- */
        const consumoAguaInicial =
            dados[0].agua_litros;
        const consumoAguaFinal =
            dados[dados.length - 1].agua_litros;

        const percentualReducaoAgua =
            (
                (
                    consumoAguaInicial -
                    consumoAguaFinal
                )
                /
                consumoAguaInicial
            )
            * 100;

        /* -----------------------------------------
           Redução de energia
           ----------------------------------------- */
        const consumoEnergiaInicial =
            dados[0].energia_kwh;
        const consumoEnergiaFinal =
            dados[dados.length - 1].energia_kwh;

        const percentualReducaoEnergia =
            (
                (
                    consumoEnergiaInicial -
                    consumoEnergiaFinal
                )
                /
                consumoEnergiaInicial
            )
            * 100;

        /* -----------------------------------------
           Total de atendimentos sociais
           ----------------------------------------- */
        const atendimentosTotal =
            dados.reduce(
                (total, item) =>
                    total + item.atendimentos_sociais,
                0
            );

        /* -----------------------------------------
           Exibição
           ----------------------------------------- */
        totalReciclado.textContent =
            recicladoTotal.toLocaleString("pt-BR");

        reducaoAgua.textContent =
            percentualReducaoAgua
                .toFixed(1)
                .replace(".", ",");

        reducaoEnergia.textContent =
            percentualReducaoEnergia
                .toFixed(1)
                .replace(".", ",");

        totalAtendimentos.textContent =
            atendimentosTotal.toLocaleString("pt-BR");
    }

    /* =========================================================
       CONFIGURAÇÕES GERAIS DO CHART.JS
       ========================================================= */
    Chart.defaults.font.family =
        "'Montserrat', sans-serif";
    Chart.defaults.color =
        "rgba(255, 255, 255, 0.72)";

    /* =========================================================
       GRÁFICO 1
       MATERIAIS RECICLADOS
       ========================================================= */
    function criarGraficoReciclagem(dados) {
        const meses =
            dados.map(item => item.mes);

        const valores =
            dados.map(item => item.reciclados_kg);

        new Chart(
            graficoReciclagemCanvas,
            {
                type: "bar",
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label:
                                "Materiais reciclados (kg)",
                            data:
                                valores,
                            backgroundColor:
                                "rgba(214, 199, 168, 0.82)",
                            borderColor:
                                "#d6c7a8",
                            borderWidth:
                                1,
                            borderRadius:
                                8,
                            borderSkipped:
                                false,
                            maxBarThickness:
                                58
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: "index",
                        intersect: false
                    },

                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            backgroundColor:
                                "#171a17",
                            titleColor:
                                "#ffffff",
                            bodyColor:
                                "#f4f1e8",
                            borderColor:
                                "rgba(214, 199, 168, 0.25)",
                            borderWidth:
                                1,
                            padding:
                                12,
                            callbacks: {
                                label(context) {
                                    return (
                                        `${context.raw} kg reciclados`
                                    );
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                color:
                                    "rgba(255,255,255,0.65)"
                            }
                        },

                        y: {
                            beginAtZero: true,
                            border: {
                                display: false
                            },
                            grid: {
                                color:
                                    "rgba(255,255,255,0.07)"
                            },
                            ticks: {
                                color:
                                    "rgba(255,255,255,0.55)",
                                callback(value) {
                                    return `${value} kg`;
                                }
                            }
                        }
                    }
                }
            }
        );
    }

    /* =========================================================
       GRÁFICO 2
       CONSUMO DE ÁGUA
       ========================================================= */
    function criarGraficoAgua(dados) {
        const meses =
            dados.map(item => item.mes);

        const valores =
            dados.map(item => item.agua_litros);

        new Chart(
            graficoAguaCanvas,
            {
                type: "line",
                data: {
                    labels:
                        meses,
                    datasets: [
                        {
                            label:
                                "Consumo de água",
                            data:
                                valores,
                            borderColor:
                                "#d6c7a8",
                            backgroundColor:
                                "rgba(214,199,168,0.12)",
                            fill:
                                true,
                            tension:
                                0.4,
                            borderWidth:
                                3,
                            pointRadius:
                                5,
                            pointHoverRadius:
                                7,
                            pointBackgroundColor:
                                "#d6c7a8",
                            pointBorderColor:
                                "#26382c",
                            pointBorderWidth:
                                2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },

                        tooltip: {
                            backgroundColor:
                                "#171a17",
                            titleColor:
                                "#ffffff",
                            bodyColor:
                                "#f4f1e8",
                            borderColor:
                                "rgba(214, 199, 168, 0.25)",
                            borderWidth:
                                1,
                            padding:
                                12,
                            callbacks: {
                                label(context) {
                                    return (
                                        `${context.raw.toLocaleString("pt-BR")} litros`
                                    );
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                color:
                                    "rgba(255,255,255,0.65)"
                            }
                        },
                        y: {
                            border: {
                                display: false
                            },
                            grid: {
                                color:
                                    "rgba(255,255,255,0.07)"
                            },
                            ticks: {
                                color:
                                    "rgba(255,255,255,0.55)",
                                callback(value) {
                                    return (
                                        value.toLocaleString("pt-BR")
                                    );
                                }
                            }
                        }
                    }
                }
            }
        );
    }


    /* =========================================================
       GRÁFICO 3
       COMPOSIÇÃO DOS RESÍDUOS
       ========================================================= */
    function criarGraficoResiduos(dados) {
        /*
         * Soma cada tipo de material
         * ao longo dos meses.
         */
        const totalPapel =
            somarCampo(dados, "papel_kg");
        const totalPlastico =
            somarCampo(dados, "plastico_kg");
        const totalVidro =
            somarCampo(dados, "vidro_kg");
        const totalMetal =
            somarCampo(dados, "metal_kg");

        new Chart(
            graficoResiduosCanvas,
            {
                type: "doughnut",
                data: {
                    labels: [
                        "Papel",
                        "Plástico",
                        "Vidro",
                        "Metal"
                    ],
                    datasets: [
                        {
                            data: [
                                totalPapel,
                                totalPlastico,
                                totalVidro,
                                totalMetal
                            ],
                            backgroundColor: [
                                "#d6c7a8",
                                "#667a5b",
                                "#9aa78f",
                                "#394b3e"
                            ],
                            borderColor:
                                "#26382c",
                            borderWidth:
                                4,
                            hoverOffset:
                                8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout:
                        "68%",
                    plugins: {
                        legend: {
                            position:
                                "bottom",
                            labels: {
                                color:
                                    "rgba(255,255,255,0.72)",
                                padding:
                                    18,
                                usePointStyle:
                                    true,
                                pointStyle:
                                    "circle"
                            }
                        },
                        tooltip: {
                            backgroundColor:
                                "#171a17",
                            titleColor:
                                "#ffffff",
                            bodyColor:
                                "#f4f1e8",
                            borderColor:
                                "rgba(214, 199, 168, 0.25)",
                            borderWidth:
                                1,
                            padding:
                                12,
                            callbacks: {
                                label(context) {
                                    return (
                                        `${context.label}: ${context.raw} kg`
                                    );
                                }
                            }
                        }
                    }
                }
            }
        );
    }

    /* =========================================================
       FUNÇÃO AUXILIAR
       ========================================================= */
    function somarCampo(dados, campo) {
        return dados.reduce(
            (total, item) =>
                total + item[campo],
            0
        );
    }

    /* =========================================================
       INICIALIZAÇÃO
       ========================================================= */
    carregarDados();
});