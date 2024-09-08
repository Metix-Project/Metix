package school.sptech.database.entities;

public class ServidorEntity {
    private Integer id;
    private String macAddress;
    private Integer pontoDeControle;
    private Integer fkEmpresa;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public Integer getPontoDeControle() {
        return pontoDeControle;
    }

    public void setPontoDeControle(Integer pontoDeControle) {
        this.pontoDeControle = pontoDeControle;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public String getInfo() {
        return "{ id: " + getId() +
            ", macAddress: " + getMacAddress() +
            ", pontoDeControle: " + getPontoDeControle() +
            ", fkEmpresa: " + getFkEmpresa() + " }";
    }
}
