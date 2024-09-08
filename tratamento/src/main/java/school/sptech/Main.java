package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.Database;
import school.sptech.database.dao.DadosServidorDao;
import school.sptech.database.dao.EmpresaDao;
import school.sptech.database.dao.ServidorDao;

import java.util.List;

public class Main {
    private static JdbcTemplate conexao;
    public static void main(String[] args) {
        Database database = new Database();
        conexao = database.getTemplate();
        DadosServidorDao dadosServidorDao = new DadosServidorDao(conexao);

        System.out.println(dadosServidorDao.selectLast(5));
    }
}
