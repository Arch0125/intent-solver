import ethers from "ethers";

interface Intent {
  intent: string;
  amount: string;
  currency: string;
  to: string;
}

async function transferBuilder(params: Intent) {

  const tokenInterface = new ethers.utils.Interface([
    "function transfer(address to, uint256 value) public returns (bool)",
  ]);

  if (params.currency === "MATIC") {
    const transatcionObject = {
      to: params.to,
      value: ethers.utils.parseUnits(params.amount, 18).toString(),
    };
    return transatcionObject;
  } else {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": 67,
      "jsonrpc": "2.0",
      "method": "qn_getTokenMetadataBySymbol",
      "params": [{
        "symbol": "USDC"
      }]
    });
    
    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    };

    let res =await fetch(`${process.env.QUICKNODE_URL}`, requestOptions)
    res = await res.json();
    const contractAddress = res.result.tokens[0].contractAddress;
    const tokenDecimal = res.result.tokens[0].decimals;

    const callData = tokenInterface.encodeFunctionData("transfer", [
      params.to,
      ethers.utils.parseUnits(params.amount, tokenDecimal),
    ]);

    const transactionObject = {
      to: contractAddress,
      data: callData,
    }

    return transactionObject;
    
  } 
}


export default transferBuilder;
