package school.sptech.database.entities;

public class DadosServidorEntity {
    private String macAddress;
    private Double cpuPorc;
    private Double memoriaPorc;
    private Double discoPorc;
    private Double cpuAbs;
    private Double memoriaAbs;
    private Double discoAbs;
    private String dataHora;
    private Integer pontoDeControle;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public Double getCpuPorc() {
        return cpuPorc;
    }

    public void setCpuPorc(Double cpuPorc) {
        this.cpuPorc = cpuPorc;
    }

    public Double getMemoriaPorc() {
        return memoriaPorc;
    }

    public void setMemoriaPorc(Double memoriaPorc) {
        this.memoriaPorc = memoriaPorc;
    }

    public Double getDiscoPorc() {
        return discoPorc;
    }

    public void setDiscoPorc(Double discoPorc) {
        this.discoPorc = discoPorc;
    }

    public Double getCpuAbs() {
        return cpuAbs;
    }

    public void setCpuAbs(Double cpuAbs) {
        this.cpuAbs = cpuAbs;
    }

    public Double getMemoriaAbs() {
        return memoriaAbs;
    }

    public void setMemoriaAbs(Double memoriaAbs) {
        this.memoriaAbs = memoriaAbs;
    }

    public Double getDiscoAbs() {
        return discoAbs;
    }

    public void setDiscoAbs(Double discoAbs) {
        this.discoAbs = discoAbs;
    }

    public String getDataHora() {
        return dataHora;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public Integer getPontoDeControle() {
        return pontoDeControle;
    }

    public void setPontoDeControle(Integer pontoDeControle) {
        this.pontoDeControle = pontoDeControle;
    }

    @Override
    public String toString() {
        return "{ macAddress: " + this.macAddress +
            ", cpuPorc: " + this.cpuPorc +
            ", memoriaPorc: " + this.memoriaPorc +
            ", discoPorc: " + this.discoPorc +
            ", cpuAbs: " + this. cpuAbs+
            ", memoriaAbs: " + this.memoriaAbs +
            ", discoAbs: " + this.discoAbs +
            ", dataHora: " + this.dataHora +
            ", pontoDeControle: " + this.pontoDeControle +
            " }";
    }
}
