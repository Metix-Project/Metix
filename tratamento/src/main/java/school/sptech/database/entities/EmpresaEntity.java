package school.sptech.database.entities;

public class EmpresaEntity {
    Integer id;
    String razaoSocial;
    String nomeFantasia;
    String email;
    String cnpj;
    String telefone;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getInfo() {
        return "{ id: " + getId() +
        ", razaoSocial: " + getRazaoSocial() +
                ", nomeFantasia: " + getNomeFantasia() +
                ", email: " + getEmail() +
                ", cnpj: " + getCnpj() +
                ", telefone: " + getTelefone() + " }";
    }
}
