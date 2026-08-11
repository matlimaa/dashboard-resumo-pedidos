// ==UserScript==
// @name         Dashboard Cozinha
// @namespace    cozinha.dashboard
// @version      1.1
// @description  Resumo do pedido para cozinha
// @match        https://app.aufisoft.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // =========================================================
    // INICIALIZAÇÃO
    // =========================================================

    criarBotao();


    // =========================================================
    // BOTÃO COZINHA
    // =========================================================

    function criarBotao() {

        // Evita criar mais de um botão
        if (document.getElementById('btn-cozinha')) return;

        const btn = document.createElement('button');

        btn.id = 'btn-cozinha';

        btn.innerHTML = `
            🍕
            <br>
            <span style="
                font-size:12px;
                font-weight:bold;
            ">
                Cozinha
            </span>
        `;

        btn.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;

            width: 80px !important;
            height: 80px !important;

            border: none !important;
            border-radius: 50% !important;

            background: #dc2626 !important;
            color: white !important;

            font-weight: bold !important;
            font-family: Arial, sans-serif !important;

            cursor: pointer !important;

            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;

            padding: 0 !important;
            margin: 0 !important;

            box-shadow: 0 4px 12px rgba(0,0,0,.4) !important;

            pointer-events: auto !important;

            z-index: 2147483647 !important;
        `;

        // =====================================================
        // CLIQUE
        // =====================================================

        btn.addEventListener('click', function (e) {

            e.preventDefault();
            e.stopPropagation();

            abrirResumo();

        }, true);

        document.body.appendChild(btn);
    }


    // =========================================================
    // ABRIR RESUMO
    // =========================================================

    function abrirResumo() {

        // Remove popup anterior
        document.getElementById('popup-cozinha')?.remove();

        // Captura pedido atual
        const pedido = coletarPedido();

        // =====================================================
        // POPUP
        // =====================================================

        const popup = document.createElement('div');

        popup.id = 'popup-cozinha';

        popup.style.cssText = `
            position: fixed !important;

            top: 50% !important;
            left: 50% !important;

            transform: translate(-50%, -50%) !important;

            width: 500px !important;
            max-width: calc(100vw - 40px) !important;

            max-height: 80vh !important;

            overflow-y: auto !important;
            overflow-x: hidden !important;

            background: #111 !important;
            color: white !important;

            padding: 20px !important;

            border-radius: 12px !important;

            box-shadow: 0 0 30px rgba(0,0,0,.6) !important;

            font-family: Arial, sans-serif !important;

            z-index: 2147483646 !important;

            pointer-events: auto !important;
        `;


        // =====================================================
        // TIPO
        // =====================================================

        const emoji =
            pedido.tipo === 'Delivery'
                ? '🚚'
                : '🏪';


        // =====================================================
        // HTML DOS ITENS
        // =====================================================

        const itensHTML = pedido.itens.map(item => {

            const detalhesHTML =
                item.detalhes && item.detalhes.length
                    ? `
                        <div style="
                            margin-top:8px;
                            padding-left:10px;
                            font-size:14px;
                            color:#d1d5db;
                            line-height:1.5;
                        ">
                            ${item.detalhes.map(d => `
                                <div>
                                    • ${d}
                                </div>
                            `).join('')}
                        </div>
                    `
                    : '';

            return `
                <div style="
                    margin-bottom:12px;
                    padding:12px;
                    background:#1f1f1f;
                    border-radius:8px;
                ">

                    <div style="
                        font-size:19px;
                        font-weight:bold;
                        color:#fff;
                    ">
                        ${item.nome}
                    </div>

                    <div style="
                        margin-top:4px;
                        font-size:17px;
                        color:#4ade80;
                        font-weight:bold;
                    ">
                        ${item.valor}
                    </div>

                    ${detalhesHTML}

                </div>
            `;

        }).join('');


        // =====================================================
        // OBSERVAÇÃO
        // =====================================================

        const observacaoHTML =
            pedido.observacao
                ? `
                    <div style="
                        margin-top:18px;
                        padding:12px;
                        background:#302200;
                        border-radius:8px;
                        font-size:16px;
                        line-height:1.4;
                    ">
                        <div style="
                            font-weight:bold;
                            margin-bottom:5px;
                        ">
                            📝 OBSERVAÇÃO
                        </div>

                        ${pedido.observacao}
                    </div>
                `
                : '';


        // =====================================================
        // TAXA
        // =====================================================

        const taxaHTML =
            pedido.tipo === 'Delivery'
                ? `
                    <div style="
                        margin-top:18px;
                        font-size:17px;
                    ">
                        🚚 Taxa de entrega:
                        <strong>${pedido.taxa}</strong>
                    </div>
                `
                : '';


        // =====================================================
        // HTML DO POPUP
        // =====================================================

        popup.innerHTML = `

            <!-- CABEÇALHO -->

            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                margin-bottom:20px;
            ">

                <div style="
                    font-size:26px;
                    font-weight:bold;
                ">
                    ${emoji} ${pedido.tipo}
                </div>

                <button id="fechar-popup-x"
                    style="
                        width:34px;
                        height:34px;

                        border:none;
                        border-radius:8px;

                        background:#dc2626;
                        color:white;

                        font-size:20px;
                        font-weight:bold;

                        cursor:pointer;
                    ">
                    ×
                </button>

            </div>


            <!-- ITENS -->

            <div style="
                font-size:18px;
                font-weight:bold;
                margin-bottom:10px;
            ">
                🍕 Itens do pedido
            </div>

            ${
                pedido.itens.length
                    ? itensHTML
                    : `
                        <div style="
                            padding:15px;
                            background:#1f1f1f;
                            border-radius:8px;
                            color:#aaa;
                        ">
                            Nenhum item encontrado.
                        </div>
                    `
            }


            <!-- OBSERVAÇÃO -->

            ${observacaoHTML}


            <!-- TAXA -->

            ${taxaHTML}


            <!-- TOTAL -->

            <div style="
                margin-top:20px;
                padding-top:15px;

                border-top:1px solid #333;

                font-size:30px;
                font-weight:bold;

                color:#4ade80;
            ">
                💰 ${pedido.total}
            </div>


            <!-- BOTÃO FECHAR -->

            <button id="fechar-popup"
                style="
                    margin-top:20px;

                    width:100%;

                    padding:12px;

                    border:none;
                    border-radius:8px;

                    background:#dc2626;
                    color:white;

                    font-size:16px;
                    font-weight:bold;

                    cursor:pointer;
                ">
                Fechar
            </button>

        `;


        // =====================================================
        // COLOCA POPUP NA PÁGINA
        // =====================================================

        document.body.appendChild(popup);


        // =====================================================
        // BOTÃO X
        // =====================================================

        document
            .getElementById('fechar-popup-x')
            ?.addEventListener('click', function () {

                popup.remove();

            });


        // =====================================================
        // BOTÃO FECHAR
        // =====================================================

        document
            .getElementById('fechar-popup')
            ?.addEventListener('click', function () {

                popup.remove();

            });


        // =====================================================
        // NÃO DEIXAR CLIQUES DO POPUP PROPAGAREM
        // =====================================================

        popup.addEventListener('click', function (e) {

            e.stopPropagation();

        });


        // =====================================================
        // LOG
        // =====================================================

        console.log('Pedido capturado:', pedido);
    }


    // =========================================================
    // COLETAR PEDIDO
    // =========================================================

    function coletarPedido() {

        const pedido = {

            itens: [],

            observacao: '',

            tipo: 'Retirada',

            subtotal: '',

            taxa: '',

            total: ''

        };


        // =====================================================
        // TIPO
        // =====================================================

        const tipoSelecionado =
            document.querySelector(
                '[role="tab"][aria-selected="true"] span'
            )?.innerText.trim();


        pedido.tipo =
            tipoSelecionado === 'Delivery'
                ? 'Delivery'
                : 'Retirada';


        // =====================================================
        // OBSERVAÇÃO
        // =====================================================

        pedido.observacao =
            document
                .querySelector('textarea')
                ?.value
                .trim() || '';


        // =====================================================
        // CARD DOS ITENS
        // =====================================================

        const cardItens =
            [
                ...document.querySelectorAll(
                    '.rounded-lg.border.bg-card'
                )
            ]
            .find(el =>
                el.querySelector('h3')
                    ?.innerText
                    .trim() === 'Itens'
            );


        // =====================================================
        // CAPTURA DOS ITENS
        // =====================================================

        if (cardItens) {

            cardItens
                .querySelectorAll('tbody tr')
                .forEach(tr => {

                    const tds =
                        tr.querySelectorAll('td');


                    if (tds.length < 4)
                        return;


                    // =========================================
                    // NOME
                    // =========================================

                    const nome =
                        tds[0]
                            ?.querySelector('.font-medium')
                            ?.innerText
                            .trim() || '';


                    // =========================================
                    // DETALHES
                    // =========================================

                    const detalhes = [];


                    tds[0]
                        .querySelectorAll(
                            '.text-xs.text-muted-foreground > div'
                        )
                        .forEach(grupo => {

                            const titulo =
                                grupo
                                    .querySelector('.font-medium')
                                    ?.innerText
                                    .trim()
                                    ?.replace(':', '');


                            if (!titulo)
                                return;


                            const opcoes =
                                [
                                    ...grupo.querySelectorAll(
                                        '.ml-2 span'
                                    )
                                ]
                                .map(el =>
                                    el.innerText.trim()
                                )
                                .filter(Boolean);


                            if (opcoes.length) {

                                opcoes.forEach(opcao => {

                                    detalhes.push(
                                        `${titulo}: ${opcao}`
                                    );

                                });

                            }

                        });


                    // =========================================
                    // ADICIONA ITEM
                    // =========================================

                    pedido.itens.push({

                        nome,

                        detalhes,

                        valor:
                            tds[3]
                                ?.innerText
                                .trim() || ''

                    });

                });

        }


        // =====================================================
        // TOTAIS
        // =====================================================

        const cardTotais =
            [
                ...document.querySelectorAll(
                    '.rounded-lg.border.bg-card'
                )
            ]
            .find(el =>
                el.querySelector('h3')
                    ?.innerText
                    .trim() === 'Totais'
            );


        // =====================================================
        // CAPTURA TOTAIS
        // =====================================================

        if (cardTotais) {

            const linhas =
                cardTotais.querySelectorAll(
                    '.flex.items-center.justify-between'
                );


            linhas.forEach(linha => {

                const spans =
                    linha.querySelectorAll('span');


                if (spans.length !== 2)
                    return;


                const titulo =
                    spans[0]
                        .innerText
                        .trim();


                const valor =
                    spans[1]
                        .innerText
                        .trim();


                if (titulo === 'Subtotal') {

                    pedido.subtotal = valor;

                }


                if (titulo === 'Taxa de Entrega') {

                    pedido.taxa = valor;

                }


                if (titulo === 'Total') {

                    pedido.total = valor;

                }

            });

        }


        // =====================================================
        // FALLBACK DO TOTAL
        // =====================================================

        if (!pedido.total) {

            pedido.total = pedido.subtotal || 'R$ 0,00';

        }


        return pedido;
    }


    // =========================================================
    // GARANTIR QUE O BOTÃO CONTINUE EXISTINDO
    // =========================================================
    //
    // Alguns sistemas React recriam partes da página.
    // Se o botão for removido, ele será recriado.
    //

    const observer = new MutationObserver(() => {

        if (!document.getElementById('btn-cozinha')) {

            criarBotao();

        }

    });


    observer.observe(document.body, {

        childList: true,

        subtree: true

    });

})();
