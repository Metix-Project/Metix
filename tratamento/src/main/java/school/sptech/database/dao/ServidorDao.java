package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.ServidorEntity;

import java.util.List;

public class ServidorDao {
    private JdbcTemplate conexao;

    public ServidorDao(JdbcTemplate conexao) {
        this.conexao = conexao;
    }

    public String selectById(Integer id) {
        String resultado = "";
        List<ServidorEntity> servidores = conexao.query("select * from Servidor where id = " + id, new BeanPropertyRowMapper(ServidorEntity.class));

        for (ServidorEntity servidor : servidores) resultado += servidor.getInfo() + "\n";
        return resultado;
    }

    public String select(String macAddress) {
        String resultado = "";
        List<ServidorEntity> servidores = conexao.query("select * from Servidor where macAddress = " + macAddress, new BeanPropertyRowMapper(ServidorEntity.class));

        for (ServidorEntity servidor : servidores) resultado += servidor.getInfo() + "\n";
        return resultado;
    }

    public String select(Integer pontoDeControle) {
        String resultado = "";
        List<ServidorEntity> servidores = conexao.query("select * from Servidor where pontoDeControle = " + pontoDeControle, new BeanPropertyRowMapper(ServidorEntity.class));

        for (ServidorEntity servidor : servidores) resultado += servidor.getInfo() + "\n";
        return resultado;
    }

    public Integer insert(String macAddress, Integer pontoDeControle, Integer fkEmpresa) {
        return conexao.update("insert into Servidor (macAddress, pontoDeControle, fkEmpresa) values (?, ?, ?)", macAddress, pontoDeControle, fkEmpresa);
    }

    public Integer update(Integer id, String macAddress, Integer pontoDeControle, Integer fkEmpresa) {
        return conexao.update("update Servidor set macAddress = ?, pontoDeControle = ?, fkEmpresa = ? where id = ?", macAddress, pontoDeControle, fkEmpresa, id);
    }

    public Integer delete(Integer id) {
        return conexao.update("delete from Servidor where id = ?", id);
    }
}
