# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |odoo|
  
  odoo.vm.box = "ubuntu/trusty64"

  odoo.vm.network :private_network, ip: "10.0.0.123"
  odoo.vm.hostname = "sme-" + ENV['USER']

  odoo.vm.synced_folder "./", "/var/www/", :nfs => true

  odoo.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end

  odoo.vm.provision :ansible do |ansible|
    ansible.playbook = 'config/ansible/main.yml'
    ansible.sudo = true
    ansible.host_key_checking = false
#    ansible.verbose = "v"
  end

end
