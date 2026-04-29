export type TabelaModel = {
  id: string;
  fgts: {
    clt_geral: number;
    jovem_aperndiz: number;
    domestico: number;
  };
  inss: {
    inss_ate1: number;
    inss_aliquota_ate1: number;
    inss_deducao_ate1: number;

    inss_ate2: number;
    inss_aliquota_ate2: number;
    inss_deducao_ate2: number;

    inss_inss_ate3: number;
    inss_aliquota_ate3: number;
    inss_deducao_ate3: number;

    inss_ate4: number;
    inss_aliquota_ate4: number;
    inss_deducao_ate4: number;
  };
  irrf: {
    irrf_ate1: number;
    irrf_aliquota_ate1: number;
    irrf_deducao_ate1: number;

    irrf_ate2: number;
    irrf_aliquota_ate2: number;
    irrf_deducao_ate2: number;

    irrf_inss_ate3: number;
    irrf_aliquota_ate3: number;
    irrf_deducao_ate3: number;
  };
};
