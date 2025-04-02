package org.example.threllia.model.Adress;

import org.example.threllia.model.User.UserService;
import org.example.threllia.model.User.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserService userService;

    @Override
    public Address createAddress(AddressDTO addressDTO) {
        User user = userService.getCurrentUser();

        setDTOFields(addressDTO);
        Address address = setDTOFields(addressDTO);
        address.setUser(user);

        return addressRepository.save(address);
    }

    private Address setDTOFields(AddressDTO addressDTO) {
        Address address = new Address();

        address.setAddressName(addressDTO.getAddressName());
        address.setAddress(addressDTO.getAddress());
        address.setCity(addressDTO.getCity());
        address.setCountry(addressDTO.getCity());
        address.setFirstName(addressDTO.getFirstName());
        address.setLastName(addressDTO.getLastName());
        address.setNumber(addressDTO.getNumber());
        address.setZipCode(addressDTO.getZipCode());
        address.setState(addressDTO.getState());

        return address;
    }

    @Override
    public Address getAddressById(long addressId) {
        return addressRepository.findById(addressId).get();
    }

    @Override
    public List<Address> getAddressesByUser() {
        return addressRepository.getAddressesByUserId(userService.getCurrentUser().getId());
    }

    @Override
    public AddressDTO updateAddress(long addressId, AddressDTO addressDTO) {
        Address updatedAddress = setDTOFields(addressDTO);
        addressRepository.save(updatedAddress);
        return addressDTO;
    }

    @Override
    public void deleteAddress(long addressId) {
        addressRepository.deleteById(addressId);
    }
}
