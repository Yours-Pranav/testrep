// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RektStoryNFT is ERC721URIStorage, Ownable {
  uint256 public nextId;
  constructor() ERC721('RektStory', 'REKTST') {}

  function mintTo(address to, string memory tokenURI) public onlyOwner returns (uint256) {
    uint256 id = ++nextId;
    _safeMint(to, id);
    _setTokenURI(id, tokenURI);
    return id;
  }
}
