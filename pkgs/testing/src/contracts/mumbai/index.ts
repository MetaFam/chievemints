import BitsAddress from './Bits.address'
import BulkDisbursableNFTsAddress from './BulkDisbursableNFTs.address'
import BitsABI from './Bits.abi'
import BulkDisbursableNFTsABI from './BulkDisbursableNFTs.abi'

const config = {
  address: {
    Bits: BitsAddress,
    BulkDisbursableNFTs: BulkDisbursableNFTsAddress,
  },
  abi: {
    Bits: BitsABI,
    BulkDisbursableNFTs: BulkDisbursableNFTsABI,
  },
  Bits: {
    address: BitsAddress,
    abi: BitsABI,
  },
  BulkDisbursableNFTs: {
    address: BulkDisbursableNFTsAddress,
    abi: BulkDisbursableNFTsABI,
  },
}

export default config