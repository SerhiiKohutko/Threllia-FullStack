package org.example.threllia.model.Adress;

import java.util.List;

public interface AddressService {
    Address createAddress(AddressDTO addressDTO);
    Address getAddressById(long addressId);
    List<Address> getAddressesByUser();
    AddressDTO updateAddress(long addressId, AddressDTO addressDTO);
    void deleteAddress(long addressId);

}
